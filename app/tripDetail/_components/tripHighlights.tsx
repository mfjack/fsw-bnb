import Image from 'next/image';

interface TripHighlightsProps {
	highlights: string[];
}

const TripHighlights = ({ highlights }: TripHighlightsProps) => {
	return (
		<section className='container mx-auto p-5 flex flex-col'>
			<h2 className='semi-bold text-primaryDarker'>Destaques</h2>

			<div className='flex flex-wrap mt-2 gap-y-2'>
				{highlights.map(highlight => (
					<div
						className='flex items-center gap-x-2 w-1/2 text-primaryDarker'
						key={highlight}
					>
						<Image
							src={'/check-icon.svg'}
							alt={highlight}
							width={16}
							height={16}
						/>
						<p className='text-xs text-grayPrimary'>{highlight}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default TripHighlights;
