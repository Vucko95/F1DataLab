from fastapi import APIRouter
from sqlalchemy import desc, func
from settings.config import *
from sqlalchemy.orm import Session
from settings.db import Session
from models.models import *
from settings.utils import *
from fastapi import Depends
from settings.db import get_database_session
from fastapi.responses import JSONResponse

router = APIRouter()
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
@router.get("/standings/constructors/{year}",tags=["Constructorr Standings"],summary="Constructor standigns for specific year.")
async def constructor_standings(year: int, db: Session = Depends(get_database_session)):
    try:
        constructors_standaings_query = (
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

        constructor_standings_dict = {}
        for result in constructors_standaings_query:
            constructor_id = result.constructorId
            if constructor_id in constructor_standings_dict:
                constructor_standings_dict[constructor_id] += result.total_points
            else:
                constructor_standings_dict[constructor_id] = result.total_points
        constructor_standings = sorted([
            {
                "constructorId": constructor_id,
                "constructor_name": constructor_map.get(constructor_id, "Unknown"),
                "total_points": total_points,
            }
            for constructor_id, total_points in constructor_standings_dict.items()
        ],
        key=lambda x: x["total_points"],
        reverse=True
        )
        return constructor_standings

    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}

@router.get("/standings/constructors/{year}/treemap",tags=["Constructorr Standings"],summary="Driver standings TreeMap API")
async def driver_standings(year: int, db: Session = Depends(get_database_session)):
    try:
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
        constructors_standaings_query = (
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

        constructor_standings_dict = {}
        for result in constructors_standaings_query:
            constructor_id = result.constructorId
            if constructor_id in constructor_standings_dict:
                constructor_standings_dict[constructor_id] += result.total_points
            else:
                constructor_standings_dict[constructor_id] = result.total_points
        constructor_standings = sorted([
            {
                "constructorId": constructor_id,
                "constructor_name": constructor_map.get(constructor_id, "Unknown"),
                "total_points": total_points,
            }
            for constructor_id, total_points in constructor_standings_dict.items()
        ],
        key=lambda x: x["total_points"],
        reverse=True
        )
        # TODO ! REMOVE HARCDODED COLORS
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
        for constructor in constructor_standings:
            constructor["color"] = driver_colors.get(constructor["constructor_name"], "#000000")

        return constructor_standings
    

    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}


@router.get("/constructors/donut/{year}",tags=["Constructor Standings"],summary="Get Constructor Standings Donut Chart"  )
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
        constructor_standings_query = (db.query(ConstructorStanding,Constructor)
                                    .join(Constructor, Constructor.constructorId == ConstructorStanding.constructorId)
                                    .filter(ConstructorStanding.raceId == latest_race_id)
                                    .all()       ) 
             
        constructor_standings = []
        for constructor_standing, constructor in constructor_standings_query:
            constructor_standings.append({
                
                    "driver_ref": constructor.constructorRef,
                    "total_points": constructor_standing.points,
                })
        response = {
            "labels" : [],
            "datasets": [{
                "data": [],
            }]}
        sorted_constructor_standings = sorted(constructor_standings, key=lambda x: x["total_points"], reverse=True)

        top_10_constructor_standings = sorted_constructor_standings[:10]
        for entry in top_10_constructor_standings:
            response["labels"].append(entry["driver_ref"])
            response["datasets"][0]["data"].append(entry["total_points"]) 

        response = append_colors_to_labels_constructor(response)
        return response

    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}
    
@router.get("/constructors/bar/{year}",tags=["Constructor Standings"],summary="Get Constructor Standings Bar Chart" )
async def driver_standings(year: int, db: Session = Depends(get_database_session)):
    try:
        subquery_latest_race = (
            db.query(Race.raceId)
            .filter(Race.year == year, Race.date <= func.CURRENT_DATE())
            .order_by(desc(Race.date))
            .limit(1)
            .subquery()
        )
        latest_race_id = 1110
        # latest_race_id = db.query(subquery_latest_race.c.raceId).scalar()
        constructor_standings_query = (db.query(ConstructorStanding,Constructor)
                                    .join(Constructor, Constructor.constructorId == ConstructorStanding.constructorId)
                                    .filter(ConstructorStanding.raceId == latest_race_id)
                                    .all()       ) 
 
        races_before_count = (
        db.query(func.count(Race.raceId))
        .filter(Race.year == year, Race.date < func.CURRENT_DATE())
        .scalar()
    )
        constructor_standings = []
        for constructor_standing, constructor in constructor_standings_query:

            average_points = constructor_standing.points/races_before_count
            constructor_standings.append(
                {
                    "driver_ref": constructor.constructorRef,
                    "total_points": average_points,
                }
            )
        sorted_constructor_standings = sorted(constructor_standings, key=lambda x: x["total_points"], reverse=True)

        top_10_constructor_standings = sorted_constructor_standings[:10]

        response = {
            "labels" : [],
            "datasets": [{
                "data": [],

            }]
        }
        for entry in top_10_constructor_standings:
            response["labels"].append(entry["driver_ref"])
            response["datasets"][0]["data"].append(round(entry["total_points"], 1))  # Round to 1 decimal place

        response = append_colors_to_labels_constructor(response)
        return response
    
    except Exception as e:
        print(f"An error occurred while processing the request: {str(e)}")
        return {"error": "An error occurred while processing the request"}



@router.get("/constructors/graph/{year}", tags=["Constructor Standings"], summary="Get Constructors Line Chart")
async def get_constructor_points_by_race(year: int, db: Session = Depends(get_database_session)) -> dict:

    races = db.query(Race.raceId).filter(Race.year == year).order_by(Race.date).all()

    constructors = (
        db.query(Constructor.constructorId)
        .join(Result, Result.constructorId == Constructor.constructorId)
        .join(Race, Race.raceId == Result.raceId)
        .filter(Race.year == year)
        .distinct()
        .all()
    )

    constructor_points_query = (
        db.query(
            Race.raceId,
            Result.constructorId,
            func.sum(Result.points).label("total_points"),
        )
        .join(Result, Result.raceId == Race.raceId)
        .filter(Race.year == year)
        .group_by(Race.raceId, Result.constructorId)
        .all()
    )

    response = []
    cumulative_points = {constructor.constructorId: 0 for constructor in constructors}

    for race in races:
        race_data = {"race": race.raceId}

        for constructor in constructors:
            race_data[constructor.constructorId] = cumulative_points[constructor.constructorId]

        for constructor_points in constructor_points_query:
            if constructor_points.raceId == race.raceId:
                cumulative_points[constructor_points.constructorId] += constructor_points.total_points
                race_data[constructor_points.constructorId] = cumulative_points[constructor_points.constructorId]

        response.append(race_data)

    return JSONResponse(content=response)


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
        
        # race_count_query=22   
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
