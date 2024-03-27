import QuickSearch from './_components/quickSearch';
import RecommendedTrip from './_components/recommendedTrip';
import TripSearch from './_components/tripSearch';

const Home = () => {
	return (
		<>
			<TripSearch />
			<QuickSearch />
			<RecommendedTrip />
		</>
	);
};

export default Home;
