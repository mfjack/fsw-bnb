import Image from 'next/image';

const QuickSearch = () => {
	return (
		<section className='container mx-auto p-5'>
			<div className='flex items-center'>
				<div className='w-full h-[1px] bg-grayLighter'></div>
				<h2 className='px-4 font-medium text-grayPrimary whitespace-nowrap'>Tente pesquisar por</h2>
				<div className='w-full h-[1px] bg-grayLighter'></div>
			</div>

			<div className='flex mt-5'>
				<div className='w-full flex justify-between items-center'>
					<Image
						src='/hotel.svg'
						alt='Hotel'
						width={48}
						height={48}
					/>
					<Image
						src='/fazenda.svg'
						alt='Fazenda'
						width={48}
						height={48}
					/>
					<Image
						src='/chale.svg'
						alt='Chalé'
						width={48}
						height={48}
					/>
					<Image
						src='/pousada.svg'
						alt='Pousada'
						width={48}
						height={48}
					/>
				</div>
			</div>
		</section>
	);
};

export default QuickSearch;
