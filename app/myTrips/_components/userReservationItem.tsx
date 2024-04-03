import { Prisma } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';
import { ptBR } from 'date-fns/locale/pt-BR';
import Button from '@/app/_components/button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface UserReservationItemProps {
	reservation: Prisma.TripReservationGetPayload<{
		include: { trip: true };
	}>;
}

const UserReservationItem = ({ reservation }: UserReservationItemProps) => {
	const router = useRouter();
	const { trip } = reservation;

	const handleDeleteClick = async () => {
		const res = await fetch(`/api/trips/reservation/${reservation.id}`, {
			method: 'DELETE',
		});

		if (res.ok) {
			return toast.error('Ocorreu um erro ao cancelar sua reserva, tente novamente!');
		}

		toast.success('Reserva cancelada com sucesso!', { position: 'top-center' });

		router.refresh();
	};

	return (
		<section className='container mx-auto p-5'>
			<div className='flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg'>
				<div className='flex items-center gap-3 pb-5 border-b border-graylighter border-solid'>
					<div className='relative h-[106px] w-[124px]'>
						<Image
							className='rounded-lg'
							src={trip.coverImage}
							alt={trip.name}
							style={{ objectFit: 'cover' }}
							fill
						/>
					</div>

					<div className='flex flex-col'>
						<h2 className='text-xl text-primaryDarker font-semibold'>{trip.name}</h2>

						<div className='flex items-center gap-1'>
							<ReactCountryFlag
								countryCode={trip.countryCode}
								svg
							/>
							<p className='text-xs text-grayPrimary'>{trip.location}</p>
						</div>
					</div>
				</div>

				<div className='flex flex-col mt-5 text-primaryDarker'>
					<h3 className='text-sm'>Data</h3>

					<p className='text-sm'>
						{format(new Date(reservation.startDate), "dd 'de' MMMM", { locale: ptBR })} -
						{format(new Date(reservation.endDate), "dd 'de' MMMM", { locale: ptBR })}
					</p>

					<h3 className='font-semibold mt-3 text-sm'>Hóspedes</h3>
					<p className='text-sm pb-5'>{reservation.guests}</p>

					<h3 className='font-semibold text-primaryDarker mt-3 pt-5 border-t border-solid border-grayLighter'>
						Informações sobre o preço
					</h3>

					<div className='flex justify-between mt-1'>
						<p className='text-primaryDarker text-sm'>Total:</p>
						<p className='font-medium text-sm'>R${Number(reservation.totalPaid)}</p>
					</div>

					<Button
						className='mt-5'
						variant='danger'
						onClick={handleDeleteClick}
					>
						Cancelar
					</Button>
				</div>
			</div>
		</section>
	);
};

export default UserReservationItem;
