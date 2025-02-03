from fastapi import APIRouter
from sqlalchemy import desc, func
from settings.config import *
from sqlalchemy import and_
from sqlalchemy.orm import Session
from settings.db import Session
from models.models import *
from settings.utils import *
from fastapi import Depends
from settings.db import get_database_session

router = APIRouter()


@router.get("/standings/drivers/{year}",tags=["Driver Standings"],summary="Driver standigns for specific year.")
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

        return driver_standings
    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}
# ! TODO
@router.get("/standings/drivers/{year}/treemap",tags=["Driver Standings"],summary="Driver standings TreeMap API")
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
            'Aston Martin': '#0090D1',
            'Alfa Romeo': '#fff888',
            'AlphaTauri': '#2E1F26',
            'Williams': '#0092DA',
            'Haas': '#B6BABD',
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
            210: 'Haas',
            214: 'Alpine',
        }
        for driver in driver_standings:
            constructor_name = constructor_map.get(driver['constructorId'], 'Unknown')
            driver['color'] = driver_colors.get(constructor_name, '#FFFFFF')
        return driver_standings
    

    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}


@router.get("/standings/drivers/{year}/{race}",tags=["Driver"],summary="Driver standigns for specific race.")
async def driver_standings(year: int, race: int, db: Session = Depends(get_database_session)):
    # select * from races where year = 2023 order by round asc;
    try:
        latest_race_for_specified_year = (
            db.query(Race)
            .filter(Race.year == year)
            .order_by(Race.round.desc())
            .first()
        )
        latest_race_for_specified_year = latest_race_for_specified_year.raceId
        races = (
            db.query(Race)
            .filter(Race.year == year)
            .order_by(Race.round)
            .all()
        )

        selected_race = races[race - 1]  # Fix 0-indexing
        filtered_race_id = selected_race.raceId

        start_pointer = 1
        end_pointer = 10
        races_for_specified_year = (
            db.query(Race)
            .filter(Race.year == year)
            .order_by(Race.round.asc())
            .all()
        )
        if not races_for_specified_year:
            return {"error": f"No races found for the year {year}"}
        all_race_ids = [race.raceId for race in races_for_specified_year]
        # first_race_id = all_race_ids[start_pointer - 1]
        last_race_id = all_race_ids[end_pointer - 1] if end_pointer <= len(all_race_ids) else all_race_ids[-1]
        print(last_race_id)
        driver_standings_query = (
            db.query(DriverStanding, Result, Constructor, Driver)
            .join(Result, and_(
                DriverStanding.driverId == Result.driverId,
                DriverStanding.raceId == Result.raceId
            ))
            .join(Constructor, Constructor.constructorId == Result.constructorId)
            .join(Driver, Driver.driverId == Result.driverId)
            # .filter(DriverStanding.raceId >= first_race_id)
            # .filter(DriverStanding.raceId <= last_race_id)
            # .filter(DriverStanding.raceId == latest_race_for_specified_year)
            .filter(DriverStanding.raceId == filtered_race_id)
            .all()
        )

        driver_standings = []
        for driver_standing_result in driver_standings_query:
            driver_standing, result,constructor,driver  = driver_standing_result
            driver_standings.append(
                {
                    "driverId": driver_standing.driverId,
                    "raceId": driver_standing.raceId,
                    "constructorId": result.constructorId,
                    # "driver_name": f"{driver.forename} {driver.surname}",
                    "driver_name":  driver.surname,
                    "nationality": driver.nationality,
                    "driver_ref": driver.driverRef,
                    "total_points": driver_standing.points,
                    "constructorRef": constructor.constructorRef
                }
            )
        sorted_standings = sorted(driver_standings, key=lambda x: x["total_points"], reverse=True)

        return sorted_standings

    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}





@router.get("/drivers/donut/{year}",tags=["Driver"],summary="Get Donut Chart for Driver standings")
async def driver_standings(year: int, db: Session = Depends(get_database_session)):
    try:
        subquery_latest_race = (
            db.query(Race.raceId)
            .filter(Race.year == year, Race.date <= func.CURRENT_DATE())
            .order_by(desc(Race.date))
            .limit(1)
            .subquery()
        )
        # latest_race_id = db.query(subquery_latest_race.c.raceId).scalar()
        latest_race_id = 1110
        driver_standings_query = (db.query(DriverStanding, Driver)
                                    .join(Driver, Driver.driverId == DriverStanding.driverId)
                                    .filter(DriverStanding.raceId == latest_race_id)
                                    .all())
             
        driver_standings = []
        for driver_standing, driver in driver_standings_query:
            driver_standings.append({
                
                    "driver_ref": driver.driverRef,
                    "total_points": driver_standing.points,
                })
        response = {
            "labels" : [],
            "datasets": [{
                "data": [],
            }]}
        sorted_driver_standings = sorted(driver_standings, key=lambda x: x["total_points"], reverse=True)

        top_10_driver_standings = sorted_driver_standings[:12]
        for entry in top_10_driver_standings:
            response["labels"].append(entry["driver_ref"])
            response["datasets"][0]["data"].append(entry["total_points"]) 
        
        response = append_colors_to_labels(response)
        return response

    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}
    

@router.get("/drivers/bar/{year}",tags=["Driver"],summary="Get Bar Chart for Driver standings")
async def driver_standings(year: int, db: Session = Depends(get_database_session)):
    try:
        subquery_latest_race = (
            db.query(Race.raceId)
            .filter(Race.year == year, Race.date <= func.CURRENT_DATE())
            .order_by(desc(Race.date))
            .limit(1)
            .subquery()
        )
        # latest_race_id = db.query(subquery_latest_race.c.raceId).scalar()
        latest_race_id = 1110
        driver_standings_query = (db.query(DriverStanding, Driver)
                                    .join(Driver, Driver.driverId == DriverStanding.driverId)
                                    .filter(DriverStanding.raceId == latest_race_id)
                                    .all())
 
        races_before_count = (
        db.query(func.count(Race.raceId))
        .filter(Race.year == year, Race.date < func.CURRENT_DATE())
        .scalar()
    )
        driver_standings = []
        for driver_standing, driver in driver_standings_query:

            average_points = driver_standing.points/races_before_count
            driver_standings.append(
                {
                    "driver_ref": driver.driverRef,
                    "total_points": average_points,
                }
            )
        sorted_driver_standings = sorted(driver_standings, key=lambda x: x["total_points"], reverse=True)

        top_10_driver_standings = sorted_driver_standings[:10]

        response = {
            "labels" : [],
            "datasets": [{
                "data": [],
            }]
        }
        for entry in top_10_driver_standings:
            response["labels"].append(entry["driver_ref"])
            response["datasets"][0]["data"].append(round(entry["total_points"], 1))  # Round to 1 decimal place
        
        response = append_colors_to_labels(response)
        response['labels'] = [label[:3] for label in response['labels']]

        return response
    
    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}
    