import React, { useState, useRef, useEffect } from 'react';
import Stack from './card_stack';

const styleData = [
	{
		id: 1,
		judul: 'Vincent Van Gogh',
		deskripsi:
			'Gaya Van Gogh dikenal dengan sapuan kuas yang tebal, berputar, dan dramatis. Warna-warnanya intens dan hidup, menciptakan kesan emosional yang kuat. Dengan style ini, foto kamu akan terlihat seperti lukisan ekspresif dengan tekstur khas ala Starry Night penuh gerakan, kedalaman, dan energi.',
		img: './images/van_gogh.png',
		images: [
			'./images/van_gogh1.png',
			'./images/van_gogh2.png',
			'./images/van_gogh3.png',
			'./images/van_gogh4.png'
		]
	},
	{
		id: 2,
		judul: 'Claude Monet',
		deskripsi:
			'Gaya Monet memunculkan suasana lembut khas impresionisme. Detail dibuat halus dan kabur, fokus pada cahaya, warna pastel, dan atmosfer yang menenangkan. Dengan style ini, foto kamu akan berubah menjadi lukisan yang dreamy, elegan, dan penuh nuansa cahaya, seperti seri Water Lilies.',
		img: './images/monet.png',
		images: [
			'./images/monet1.png',
			'./images/monet2.png',
			'./images/monet3.png',
			'./images/monet4.png'
		]
	},
	{
		id: 3,
		judul: 'Paul Cezanne',
		deskripsi:
			'Gaya Cezanne menekankan struktur, bentuk geometris, dan keseimbangan komposisi. Warna digunakan untuk membangun volume dan kedalaman, bukan sekadar estetika visual. Dengan style ini, foto akan terlihat lebih kokoh dan terstruktur, menyerupai lukisan post-impressionism yang rasional dan artistik.',
		img: './images/cezanne.png',
		images: [
			'./images/cezanne1.png',
			'./images/cezanne2.png',
			'./images/cezanne3.png',
			'./images/cezanne4.png'
		]
	},
	{
		id: 4,
		judul: 'Ukiyo-e',
		deskripsi:
			'Ukiyo-e merupakan gaya seni cetak kayu khas Jepang dengan garis tegas, warna datar, dan komposisi sederhana namun kuat. Elemen visual tampil bersih, dekoratif, dan ikonik. Foto dengan style Ukiyo-e akan terlihat seperti ilustrasi klasik Jepang, menonjolkan siluet, pola, dan estetika tradisional yang elegan.',
		img: './images/ukiyo.png',
		images: [
			'./images/ukiyo1.png',
			'./images/ukiyo2.png',
			'./images/ukiyo3.png',
			'./images/ukiyo4.png'
		]
	}
];

const AboutSection: React.FC = () => {
	const [activeId, setActiveId] = React.useState(1);
	const currentStyle = styleData.find(style => style.id === activeId) || styleData[0];

	const descRef = useRef<HTMLDivElement>(null);
	const stackRef = useRef<HTMLDivElement>(null);
	const [visibleDesc, setVisibleDesc] = useState(false);
	const [visibleStack, setVisibleStack] = useState(false);

	useEffect(() => {
		const observerDesc = new window.IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) setVisibleDesc(true);
			},
			{ threshold: 0.2 }
		);
		if (descRef.current) observerDesc.observe(descRef.current);
		return () => observerDesc.disconnect();
	}, []);

	useEffect(() => {
		const observerStack = new window.IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) setVisibleStack(true);
			},
			{ threshold: 0.5 }
		);
		if (stackRef.current) observerStack.observe(stackRef.current);
		return () => observerStack.disconnect();
	}, []);

	return (
		<div className="lg:mb-24">
			{/* Divider */}
			<div className="w-full h-px bg-gradient-to-r from-[#F3E3B2]/5 via-[#AB743C]/80 to-[#F3E3B2]/5 mb-6 lg:mb-24"></div>

			<div className="py-12 grid grid-cols-1 lg:grid-cols-5 mx-auto max-w-7xl w-full">
				{/* LEFT: CARD STACK */}
				<div
					ref={stackRef}
					className={`flex items-center justify-center min-h-[40vh] px-4 col-span-2 transition-all duration-700 ${
						visibleStack ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
					}`}
				>
					<Stack
						cardsData={styleData.map(({ id, img }) => ({ id, img }))}
						onIndexChange={setActiveId}
						cardDimensions={{ width: 320, height: 400 }}
					/>
				</div>
				{/* RIGHT: DESCRIPTION */}
				<div
					ref={descRef}
					className={`flex flex-col items-start justify-center min-h-[40vh] px-8 lg:pr-16 col-span-3 transition-all duration-700 ${
						visibleDesc ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
					}`}
				>
					<img
						className="pt-6 lg:pt-0 px-25 lg:px-60 pb-4 lg:pb-10"
						src="./images/frame.png"
						alt="frame"
					/>
					<h1 className="text-4xl lg:text-6xl font-bold mb-4">
						{currentStyle.judul}
					</h1>
					<p className="mb-3 text-left text-base lg:text-xl">
						{currentStyle.deskripsi}
					</p>
					<div className="flex lg:mt-2 gap-3 lg:gap-5">
						{currentStyle.images.map((imgSrc: string, idx: number) => (
							<img
								key={idx}
								src={imgSrc}
								alt={currentStyle.judul + '-' + idx}
								className="w-20 h-10 lg:w-35 lg:h-20 object-cover border rounded-sm lg:rounded-lg transition-transform duration-500 ease-in-out hover:scale-110 hover:cursor-pointer"
							/>
						))}
					</div>
					<img
						className="px-25 lg:px-60 pb-6 lg:pb-10 scale-y-[-1]"
						src="./images/frame.png"
						alt="frame"
					/>
				</div>
			</div>
			{/* lamp */}
			<div className="absolute left-0 top-180 lg:top-200 w-full pointer-events-none z-40">
				<img
					src="../images/lamp.png"
					alt="lamp left"
					className="left-0 top-0 h-full w-30 lg:w-70 object-left object-cover scale-x-[-1]"
				/>
				<img
					src="../images/lamp.png"
					alt="lamp right"
					className="absolute right-0 top-0 h-full w-30 lg:w-70 object-right object-cover"
				/>
			</div>
		</div>
	);
};

export default AboutSection;
