interface TripDescriptionProps {
	description: string;
}

const TripDescription = ({ description }: TripDescriptionProps) => {
	return (
		<section className='container mx-auto p-5'>
			<h2 className='semi-bold text-primaryDarker'>Sobre a Viagem</h2>
			<p className='text-xs leading-5 text-primaryDarker mt-1'>{description}</p>
		</section>
	);
};

export default TripDescription;
