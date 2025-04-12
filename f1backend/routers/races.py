# import aiohttp
import asyncio
from datetime import date, datetime
from heapq import nlargest
from typing import Dict, List
from settings.utils import *
import requests
from fastapi import APIRouter, Depends
from models.models import *
# from pydantic import BaseModel, ValidationError
from settings.config import *
from settings.db import Session, get_database_session
from sqlalchemy import desc, func
from sqlalchemy.orm import Session, joinedload

router = APIRouter()
def get_driver_standings_from_db(year: int, db: Session):
    return db.query(DriverStanding, Driver).filter(DriverStanding.year == year).join(Driver, Driver.driverId == DriverStanding.driverId).all()
def prepare_chart_data(data):
    labels = data['labels']
    datasets = data['datasets']
    color_mapping = {
        'lec': '#FF0000',
        'sai': '#FF0000',
        'hul': '#9f9e9e',
        'haas': '#9f9e9e',
        'tsu': '#334396',
        'de_': '#334396',
        'alb': '#2a98ed',
        'sar': '#2a98ed',
        'gas': '#2263e6',
        'oco': '#2263e6',
        'kev': '#9f9e9e',
        'mag': '#9f9e9e',
        'bot': '#760909',
        'zho': '#760909',
        'ham': '#0af1e5d4',
        'rus': '#0af1e5d4',
        'nor': '#FF8000',
        'pia': '#FF8000',
        'alo': '#066945',
        'str': '#066945',
        'max': '#0a208d',
        'per': '#0a208d',
    }

    for dataset in datasets:
        label = dataset['label']
        if label in color_mapping:
            color = color_mapping[label]
            dataset['backgroundColor'] = color
            dataset['borderColor'] = color
    return data

def append_colors_to_labels(response_data):
    color_mapping = {
        'max_verstappen': '#0a208d',
        'perez': '#0a208d',
        'norris': '#FF8000',
        'piastri': '#FF8000',
        'leclerc': '#FF0000',
        'sainz': '#FF0000',
        'russell': '#0af1e6',
        'hamilton': '#0af1e6',
        'albon': '#2a98ed',
        'hulkenberg': '#9f9e9e',
        'alonso': '#066945',
        'stroll': '#066945',
        'ocon': '#2263e6',
        'tsunoda': '#334396',
        'gasly': '#2263e6',
    }

    labels = response_data['labels']
    background_colors = [color_mapping.get(label, '#000000') for label in labels]
    response_data['datasets'][0]['backgroundColor'] = background_colors

    return response_data


def append_colors_to_laps(response_data):
    color_mapping = {
        'max_verstappen': '#0a208d',
        'perez': '#0a208d',
        'norris': '#FF8000',
        'piastri': '#FF8000',
        'leclerc': '#FF0000',
        'sainz': '#FF0000',
        'russell': '#0af1e6',
        'hamilton': '#0af1e6',
        'albon': '#2a98ed',
        'hulkenberg': '#9f9e9e',
        'alonso': '#066945',
        'stroll': '#066945',
        'ocon': '#2263e6',
        'tsunoda': '#334396',
        'gasly': '#2263e6',
    }

    # Append color based on driver name
    for item in response_data:
        item["color"] = color_mapping.get(item["driver"], "#000000")  # Default to black if not found

    return response_data

@router.get("/race/laptimes/{raceId}", tags=["Race"], summary="Best & Worst Lap Times for Top 10 Drivers")
async def get_driver_laptimes(raceId: int, db: Session = Depends(get_database_session)):
    try:
        # Step 1: Get top 10 drivers based on average lap time
        top_drivers = (
            db.query(
                Driver.driverId,
                Driver.driverRef,
                func.avg(LapTime.milliseconds).label("avg_lap_time")
            )
            .join(Driver, LapTime.driverId == Driver.driverId)
            .filter(LapTime.raceId == raceId)
            .group_by(Driver.driverId)
            .order_by("avg_lap_time")
            .limit(10)
            .all()
        )

        # Extract top 10 driver IDs
        top_driver_ids = {driver_id for driver_id, _, _ in top_drivers}

        # Step 2: Use ROW_NUMBER() to get the 30 best laps per driver
        best_laps_subquery = (
            db.query(
                LapTime.driverId,
                LapTime.milliseconds,
                func.row_number()
                .over(partition_by=LapTime.driverId, order_by=LapTime.milliseconds)
                .label("lap_rank")  # Assigns a ranking to each lap per driver
            )
            .filter(LapTime.raceId == raceId, LapTime.driverId.in_(top_driver_ids))
            .subquery()
        )

        # Step 3: Compute best & worst lap **only from top 30 laps per driver**
        best_worst_laps = (
            db.query(
                Driver.driverRef,
                func.min(best_laps_subquery.c.milliseconds).label("best_lap"),
                func.max(best_laps_subquery.c.milliseconds).label("worst_lap"),
            )
            .join(Driver, Driver.driverId == best_laps_subquery.c.driverId)
            .filter(best_laps_subquery.c.lap_rank <= 30)  # Only top 30 laps per driver
            .group_by(Driver.driverRef)
            .all()
        )

        # Step 4: Convert to JSON-serializable format
        result = [
            {
                "driver": driver, 
                "best_lap": int(best) / 10000, 
                "worst_lap": int(worst) / 10000
            }
            for driver, best, worst in best_worst_laps
        ]
        result = append_colors_to_laps(result)

        return result

    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}
#  TODO ADD +- 3 and then make some kind of a bar chart with their average speed
#  TODO TEST THE GRAPH AS WELL    


    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}


@router.get("/race/average/{raceId}",tags=["Race"],summary="Race Average" )
async def get_driver_laptimes(raceId: int, db: Session = Depends(get_database_session)):
    try:
        lap_times_query = (
            db.query(LapTime, Driver.driverRef)
            .join(Driver, LapTime.driverId == Driver.driverId)
            .filter(LapTime.raceId == raceId)
            .all()
        )

        driver_laptimes = {
            "labels": ["1"],
            "datasets": []
        }

        for lap_time, driver_ref in lap_times_query:
            driver_id = lap_time.driverId
            lap_time_parts = lap_time.time.split(":")
            minutes = int(lap_time_parts[0])
            seconds = float(lap_time_parts[1])
            lap_time_seconds = round((minutes * 60) + seconds, 3)

            driver_index = None
            for index, dataset in enumerate(driver_laptimes["datasets"]):
                if dataset["label"] == driver_ref:
                    driver_index = index
                    break

            if driver_index is None:
                driver_laptimes["datasets"].append({
                    "label": driver_ref,
                    "data": [[lap_time_seconds]],
                    "borderRadius": 0,
                    "borderWidth": 2,
                    "barPercentage": 1.05,

                    # "borderSkipped": False,
                })
            else:
                driver_laptimes["datasets"][driver_index]["data"][0].append(lap_time_seconds)

        driver_laptimes["datasets"] = [
            dataset for dataset in driver_laptimes["datasets"] if len(dataset["data"][0]) >= 40
        ]

        for dataset in driver_laptimes["datasets"]:
            if dataset["data"][0]:
                average_lap_time = sum(dataset["data"][0]) / len(dataset["data"][0])
                dataset["data"][0] = [round(average_lap_time, 3), round(average_lap_time + 0.5, 3)]
            else:
                dataset["data"][0] = []

        driver_laptimes["datasets"].sort(key=lambda x: x["data"][0][0] if x["data"][0] else float("inf"))
        # Shorten the driver_ref  before the return
        for dataset in driver_laptimes["datasets"]:
            dataset["label"] = dataset["label"][:3]
            # dataset["label"] = dataset["label"][:3].upper()
        driver_laptimes = prepare_chart_data(driver_laptimes)

        return driver_laptimes

    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}

@router.get("/race/list/{year}",tags=["Race"],summary="List Races for specific year")
async def get_list_of_races_for_specific_year(year: int, db: Session = Depends(get_database_session)):
    try:
        races = (
            db.query(Race)
            .filter(Race.year == year)
            .order_by(Race.round.asc())
            .all()
        )
        races_list = [
            {"raceId" : race.raceId , "name" : race.name} for race in races
        ]

        return races_list
    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}

@router.get("/race/details/{raceId}",tags=["Race"],summary="Get Details abut specific race.")
async def get_race_details(raceId: int, db: Session = Depends(get_database_session)):
    try:
        results = (
            db.query(Result, Driver)
            .join(Driver, Driver.driverId == Result.driverId)
            .filter(Result.raceId == raceId)
            .all()
        )
        # TODO ADD NATIONALITY AND CONSTRUCOTR
        results = [
            {
              "raceId" : result.raceId ,
              "driverId" : result.driverId,
              "constructorId" : result.constructorId,
              "position"  : result.position, 
              "grid" : result.grid,
              "time" : result.time,
              "forename" : driver.forename,
              "surname" : driver.surname,
              "nationality" : driver.nationality,
            }
             for result, driver in results
        ]
        return results

    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}
    
@router.get("/race/details/{raceId}/difference",tags=["Race"],summary="Get difference between starting and finishing position.")
async def get_race_details(raceId: int, db: Session = Depends(get_database_session)):
    try:
        results = (
            db.query(Result, Driver)
            .join(Driver, Driver.driverId == Result.driverId)
            .filter(Result.raceId == raceId)
            .all()
        )
        results = [
            {
              "raceId" : result.raceId ,
              "driverId" : result.driverId,
              "constructorId" : result.constructorId,
              "position"  : result.position, 
              "grid" : result.grid,
              "forename" : driver.forename,
              "surname" : driver.surname,
            }
             for result, driver in results
        ]
        constructor_colors = get_constructor_colors()
        constructor_mapping = get_constructor_mapping()
        # return results
        refined_data = []
        for driver in results:
            driver_ref = driver['surname'][:3].upper()
            name = driver['forename']
            constructorId = driver['constructorId']
            grid = driver['grid']
            position = driver['position']
            if position is None:
                gained = 0
                lost = -grid
            else:
                gained = max(0, grid - position)
                lost = min(0, grid - position)
            if gained == 0 and lost == 0:
                continue
            team_name = constructor_mapping.get(constructorId, "Unknown")
            color = constructor_colors.get(team_name, "#888888")
            refined_data.append({
                'driver_name': name,
                'driver_name_short': driver_ref,
                'gained': gained,
                'lost' : lost,
                'color': color
            })
            refined_data.sort(key=lambda d: (d['gained'], -d['lost']), reverse=True)

        return refined_data

    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}
    

@router.get("/race/details/barchart/constructor/{raceId}", tags=["Race"], summary="Get Details about a specific race.")
async def get_race_details(raceId: int, db: Session = Depends(get_database_session)):
    try:
        results = (
            db.query(Result)
            .filter(Result.raceId == raceId)
            .all()
        )

        constructor_map = get_constructor_mapping()
        driver_colors = get_constructor_colors()

        constructor_standings = {}

        for result in results:
            constructor_id = result.constructorId
            constructor_name = constructor_map.get(constructor_id, "Unknown")
            color = driver_colors.get(constructor_name, "#FFFFFF")

            if constructor_id not in constructor_standings:
                constructor_standings[constructor_id] = {
                    "constructorId": constructor_id,
                    "constructor_name": constructor_name,
                    "points": 0,
                    "color": color
                }

            constructor_standings[constructor_id]["points"] += result.points

        sorted_standings = sorted(constructor_standings.values(), key=lambda x: x["points"], reverse=True)

        return sorted_standings


    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}



@router.get("/standings/constructors/{year}/barchart",tags=["Constructorr Standings"],summary="Driver standings BarChart API")
async def driver_standings(year: int, db: Session = Depends(get_database_session)):
    try:
        driver_standings_query = (
            db.query(
                Driver.driverId,
                Driver.forename,
                Driver.surname,
                Driver.nationality,
                func.sum(Result.points).label("total_points"),
                func.min(Result.raceId).label("raceId"),
                func.min(Result.constructorId).label("constructorId")
            )
            .join(Result, Result.driverId == Driver.driverId)
            .join(Race, Result.raceId == Race.raceId)
            .filter(Race.year == year)
            .group_by(Driver.driverId, Driver.forename, Driver.surname)
            .order_by(func.sum(Result.points).desc())
            .all()
        )
        race_count_query = (
            db.query(func.count(func.distinct(Race.raceId)).label("race_count"))
            .filter(Race.year == year)
            .scalar()
        )
        driver_standings = []
        for result in driver_standings_query:
            driver_standings.append(
                {
                    "driverId": result.driverId,
                    "raceId": result.raceId,
                    "constructorId": result.constructorId,
                    "forename": result.forename,
                    "nationality": result.nationality,
                    "surname": result.surname,
                    "total_points": result.total_points
                }
            )
        driver_colors = {
            'Red Bull Racing': '#1E41FF',
            'Ferrari': '#D92A3E',
            'Mercedes': '#00D2BE',
            'McLaren': '#FF8700',
            'Aston Martin': '#006F62',
            'Alpine': '#2173B8',
            'Alfa Romeo': '#fff888',
            'AlphaTauri': '#2E1F26',
            'Williams': '#0092DA',
            'Haas F1 Team': '#C6C6C6',
            "Sauber": "#DE3126",
            "RB F1 Team": "#223971",
        }

        constructor_map = {
            9: 'Red Bull Racing',
            6: 'Ferrari',
            131: 'Mercedes',
            1: 'McLaren',
            117: 'Aston Martin',
            51: 'Alfa Romeo',
            213: 'AlphaTauri',
            3: 'Williams',
            210: 'Haas F1 Team',
            214: 'Alpine',
            15: "Sauber",
            215: "RB F1 Team",
        }
        for driver in driver_standings:
            constructor_name = constructor_map.get(driver['constructorId'], 'Unknown')
            driver['color'] = driver_colors.get(constructor_name, '#FFFFFF')
        
        for driver in driver_standings:
            driver['total_points'] = round(driver['total_points'] / race_count_query, 2)
        
        constructor_standings = {}

        for driver in driver_standings:
            constructor_id = driver['constructorId']
            if constructor_id not in constructor_standings:
                constructor_standings[constructor_id] = {
                    "constructor_name": constructor_map.get(constructor_id, "Unknown"),
                    "total_points": 0,
                    "color": driver['color']  
                }
            constructor_standings[constructor_id]['total_points'] += driver['total_points']

        constructor_standings_list = list(constructor_standings.values())
        constructor_standings_list = sorted(
            constructor_standings.values(),
            key=lambda x: x["total_points"],
            reverse=True
        )
        return constructor_standings_list



    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}
    
@router.get("/race/results/{race_id}",tags=["Race"],summary="Get specific result for race with RaceID")
def get_race_results(race_id: int, db: Session = Depends(get_database_session)):
    try:
        race_results = (
            db.query(Result, Driver, Constructor.constructorRef)
            .join(Driver, Driver.driverId == Result.driverId)
            .join(Constructor, Constructor.constructorId == Result.constructorId)
            .filter(Result.raceId == race_id)
            .all()
        )

        race_results_list = []
        for result, driver, constructorRef in race_results:
            
            race_results_list.append(
                {
                    'race_id': race_id,
                    # 'driver': f"{driver.forename} {driver.surname}",
                    'driver': {driver.surname},
                    'constructorRef': constructorRef,
                    'position': result.position,
                    'points': result.points,
                    'laps': result.laps,
                    'time': result.time
                }
            )
            if race_results_list:
                first_result = race_results_list[0]
                if first_result['time']:
                    first_result['time'] = first_result['time'].split('.')[0]  # Remove milliseconds

        return race_results_list

    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}
    

@router.get("/qualy/results/{race_id}",tags=["Race"],summary="Get Qualifiying result for raceId.")
def get_qualy_results(race_id: int, db: Session = Depends(get_database_session)):
    try:
        qualy_results = (
            db.query(Qualifying, Driver, Constructor.constructorRef)
            .join(Driver, Driver.driverId == Qualifying.driverId)
            .join(Constructor, Constructor.constructorId == Qualifying.constructorId)
            .filter(Qualifying.raceId == race_id)
            .all()
        )
        first_driver_q3_time = None
        if qualy_results:
            first_driver_q3_time = qualy_results[0][0].q3
        qualy_results_list = []
        for qualy, driver, constructorRef in qualy_results:
            q3_time = qualy.q3
            gap = None
            if first_driver_q3_time and q3_time:
                first_driver_time = datetime.strptime(first_driver_q3_time, "%M:%S.%f")
                driver_time = datetime.strptime(q3_time, "%M:%S.%f")
                time_difference = driver_time - first_driver_time
                gap = time_difference.total_seconds()
            qualy_results_list.append(
                {
                    'race_id': race_id,
                    'driver':  {driver.surname},
                    'constructorRef': constructorRef,
                    'q3': qualy.q3,
                    'gap': gap,
                    'position': qualy.position,
                    'time': qualy.q3
                }
            )

        return qualy_results_list[:10]

    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}
    
@router.get("/qualy/gap/{race_id}",tags=["Race"],summary="Qualifinyg gap to 1st")
def get_qualy_results(race_id: int, db: Session = Depends(get_database_session)):
    try:
        qualy_results = (
            db.query(Qualifying, Driver, Constructor.constructorRef)
            .join(Driver, Driver.driverId == Qualifying.driverId)
            .join(Constructor, Constructor.constructorId == Qualifying.constructorId)
            .filter(Qualifying.raceId == race_id)
            .limit(10)
            .all()
        )
        first_driver_q3_time = None
        if qualy_results:
            first_driver_q3_time = qualy_results[0][0].q3
        qualy_results_list = []
        gaps_data = []
        labels = []
        for qualy, driver, constructorRef in qualy_results:
            q3_time = qualy.q3
            gap = None
            if first_driver_q3_time and q3_time:
                first_driver_time = datetime.strptime(first_driver_q3_time, "%M:%S.%f")
                driver_time = datetime.strptime(q3_time, "%M:%S.%f")
                time_difference = driver_time - first_driver_time
                gap = time_difference.total_seconds()
            qualy_results_list.append(
                {
                    'race_id': race_id,
                    'driver': f"{driver.forename} {driver.surname}",
                    'constructorRef': constructorRef,
                    'q3': qualy.q3,
                    'gap': gap,
                    'position': qualy.position,
                }
            )

            gaps_data.append(gap)
            labels.append(f"{driver.driverRef}")
        response = {
                "labels": labels,
                "datasets": [
                    {
                        "label": "Gaps to First",
                        "data": gaps_data,
                        # "backgroundColor" : "#COLOR BASED ON DRIVER",
                    }
                ],

            }
        # return qualy_results_list[:10]
        response = append_colors_to_labels(response)
        response['labels'] = [label[:3].upper() for label in response['labels']]  
        # Remove the first driver entry 
        response['labels'] = response['labels'][1:]
        response['datasets'][0]['data'] = response['datasets'][0]['data'][1:]
        response['datasets'][0]['backgroundColor'] = response['datasets'][0]['backgroundColor'][1:]

        return response

    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}
    


    # SLOWER QUERRY 
@router.get("/race/average/{raceId}",tags=["Race"],summary="Race Average['Slower query'] ")
async def get_driver_laptimes(raceId: int, db: Session = Depends(get_database_session)):
    try:
        lap_times_query = (
            db.query(LapTime, Driver.driverRef,Result,Constructor)
            .join(Driver, LapTime.driverId == Driver.driverId)
            .join(Result, Result.driverId == Driver.driverId)
            .join(Constructor, Constructor.constructorId == Result.constructorId)
            .filter(LapTime.raceId == raceId)
            .all()
        )

        driver_laptimes = {
            "labels": ["1"],
            "datasets": []
        }

        for lap_time, driver_ref,result, constructor in lap_times_query:
            driver_id = lap_time.driverId
            constructor_ref = constructor.constructorRef
            lap_time_parts = lap_time.time.split(":")
            minutes = int(lap_time_parts[0])
            seconds = float(lap_time_parts[1])
            lap_time_seconds = round((minutes * 60) + seconds, 3)

            driver_index = None
            for index, dataset in enumerate(driver_laptimes["datasets"]):
                if dataset["label"] == driver_ref:
                    driver_index = index
                    break

            if driver_index is None:
                driver_laptimes["datasets"].append({
                    "label": driver_ref,
                    "data": [[lap_time_seconds]],
                    "backgroundColor" : "blue",
                    "borderRadius": 0,
                    "borderWidth": 2,
                    "barPercentage": 1.05
                    # "borderSkipped": False,
                })
            else:
                driver_laptimes["datasets"][driver_index]["data"][0].append(lap_time_seconds)

        driver_laptimes["datasets"] = [
            dataset for dataset in driver_laptimes["datasets"] if len(dataset["data"][0]) >= 40
        ]

        for dataset in driver_laptimes["datasets"]:
            if dataset["data"][0]:
                average_lap_time = sum(dataset["data"][0]) / len(dataset["data"][0])
                dataset["data"][0] = [round(average_lap_time, 3), round(average_lap_time + 0.5, 3)]
            else:
                dataset["data"][0] = []

        driver_laptimes["datasets"].sort(key=lambda x: x["data"][0][0] if x["data"][0] else float("inf"))
        # Shorten the driver_ref  before the return
        for dataset in driver_laptimes["datasets"]:
            dataset["label"] = dataset["label"][:3]
        return driver_laptimes

    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}