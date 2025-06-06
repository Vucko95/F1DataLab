



const fetchData = async (url: string, method: string = 'GET', body: any = null) => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
};

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined in environment variables.");
}

  export const fetchTimeBeforeNextRace = async () => {
    return await fetchData(`${API_BASE_URL}/race/next`);

  };

export const fetchLastRaceDetails = async () => {
  return await fetchData(`${API_BASE_URL}/race/last`);
};

export const fetchDriverStandingsYearRace = async (year: number, raceNumber: number) => {
  return await fetchData(`${API_BASE_URL}/standings/drivers/${year}/${raceNumber}`);
};

export const fetchDriverStandingsYear = async (year: number) => {
  return await fetchData(`${API_BASE_URL}/standings/drivers/${year}/`);
};

export const fetchConstructorStandingsYear = async (year: number) => {
  return await fetchData(`${API_BASE_URL}/standings/constructors/${year}/`);
};

export const fetchDriverStandingsYearTree = async (year: number) => {
  return await fetchData(`${API_BASE_URL}/standings/drivers/${year}/treemap`);
};

export const fetchConstructorStandingsYearTree = async (year: number) => {
  return await fetchData(`${API_BASE_URL}/standings/constructors/${year}/treemap`);
};

export const fetchDriverStandingsYearBar = async (year: number) => {
  return await fetchData(`${API_BASE_URL}/standings/drivers/${year}/barchart`);
};

export const fetchRacesConstructorBarChart = async (raceId: number) => {
  return await fetchData(`${API_BASE_URL}/race/details/barchart/constructor/${raceId}`);
};

export const fetchConstructorStandingsYearBar = async (year: number) => {
  return await fetchData(`${API_BASE_URL}/standings/constructors/${year}/barchart`);
};

export const fetchRacesForSpecificYear = async (year: number) => {
  return await fetchData(`${API_BASE_URL}/race/list/${year}`);
};

export const fetchRaceDetails = async (raceId: number) => {
  return await fetchData(`${API_BASE_URL}/race/details/${raceId}`);
};

export const fetchRaceDetailsSummary = async (raceId: number) => {
  return await fetchData(`${API_BASE_URL}/race/details/${raceId}/summary`);
};

export const fetchRaceStartFinishDiff = async (raceId: number) => {
  return await fetchData(`${API_BASE_URL}/race/details/${raceId}/difference`);
};

export const fetchRaceStartFinishDiff2 = async (raceId: number) => {
  return await fetchData(`${API_BASE_URL}/race/details/${raceId}/position_diff`);
};

export const fetchRaceTreemap = async (raceId: number) => {
  return await fetchData(`${API_BASE_URL}/race/details/${raceId}/treemap`);
};

export const fetchConstructorStandings = async () => {
  return await fetchData(`${API_BASE_URL}/standings/constructors/2023`);
};

export const fetchCircuitsByYear = async () => {
  return await fetchData(`${API_BASE_URL}/circuits/2023`);
};

export const fetchDriversForSpecificYear = async () => {
  return await fetchData(`${API_BASE_URL}/drivers/2023`);
};

export const fetchDriversPointsForGraph = async (year: number) => {
  return await fetchData(`${API_BASE_URL}/drivers/graph/${year}`);
};

export const fetchConstructorPointsForGraph = async (year: number) => {
  return await fetchData(`${API_BASE_URL}/constructors/graph/${year}`);
};

export const fetchConstructorsGraph = async () => {
  return await fetchData(`${API_BASE_URL}/constructors/graph/2024`);
};

export const fetchRacePaceData = async (raceId: number) => {
  return await fetchData(`${API_BASE_URL}/race/laptimes/${raceId}`);
};

export const fetchRacesForSelectedYear = async () => {
  return await fetchData(`${API_BASE_URL}/race/list/2023`);
};

export const fetchDriverStandingsForDonuts = async (year: number) => {
  return await fetchData(`${API_BASE_URL}/drivers/donut/${year}`);
};

export const fetchConstructorStandingsBarGraph = async () => {
  return await fetchData(`${API_BASE_URL}/constructors/bar/2023`);
};

export const fetchConstructorStandingsForDonuts = async () => {
  return await fetchData(`${API_BASE_URL}/constructors/donut/2023`);
};

export const fetchDriverStandignsBarGraph = async () => {
  return await fetchData(`${API_BASE_URL}/drivers/bar/2023`);
};




  export const fetchCircuitWinners =async (circuitId: number) => {

    try {
      const response = await fetch(`http://localhost:8888/circuits/winners/${circuitId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  export const fetchCircuitResults =async (raceId: number) => {

    try {
      const response = await fetch(`http://localhost:8888/race/results/${raceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  export const fetchRaceResults =async (raceId: number) => {

    try {
      const response = await fetch(`http://localhost:8888/race/results/${raceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  export const fetchQualyResults =async (raceId: number) => {

    try {
      const response = await fetch(`http://localhost:8888/qualy/results/${raceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export const fetchRacePaceGraph = async (raceId: number) => {
    try {
      const response = await fetch(`http://localhost:8888/race/average/${raceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  export const fetchQualyGapGraph = async (raceId: number) => {
    try {
      const response = await fetch(`http://localhost:8888/qualy/gap/${raceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  export const fetchLastRaceDetailsErgast = async () => {
    try {
      const response = await fetch(`http://localhost:8888/race/last/api`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  export const fetchTimezone = async (timezone: string) => {
    try {
      const response = await fetch(`http://localhost:8888/race/next/${timezone}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };