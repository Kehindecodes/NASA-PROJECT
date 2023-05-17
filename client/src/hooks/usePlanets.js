import { useCallback, useEffect, useState } from 'react';

import { httpGetPlanets } from './requests';

function usePlanets() {
	const [planet, savePlanet] = useState([]);

	const getPlanets = useCallback(async () => {
		const fetchedPlanets = await httpGetPlanets();
		savePlanet(fetchedPlanets);
	}, []);

	useEffect(() => {
		getPlanets();
	}, [getPlanets]);

	return planet;
}

export default usePlanets;
