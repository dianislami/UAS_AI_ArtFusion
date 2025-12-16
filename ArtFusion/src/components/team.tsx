import React, { useRef, useEffect, useState } from 'react';
import TiltedCard from './team_card';

const teamMember = [
	{
		id: 1,
		nama: 'Firah Maulida',
		npm: 2308107010034,
		img: './images/firah.png',
	},
	{
		id: 2,
		nama: 'M. Sidqi Alfareza',
		npm: 2308107010040,
		img: './images/sidqi.png',
	},
	{
		id: 3,
		nama: 'Nadia Maghdalena',
		npm: 2308107010045,
		img: './images/nadia.png',
	},
	{
		id: 4,
		nama: 'Dian Islami',
		npm: 2308107010048,
		img: './images/dian.png',
	},
];

const TeamSection: React.FC = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const observer = new window.IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) setVisible(true);
			},
			{ threshold: 0.5 }
		);
		if (sectionRef.current) observer.observe(sectionRef.current);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={sectionRef} className={`mb-6 lg:mb-12 transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-[#F3E3B2]/5 via-[#AB743C]/80 to-[#F3E3B2]/5 mb-8 lg:mb-24"></div>

            <h1 className="text-4xl lg:text-6xl mb-8"> 
                Anggota Kelompok 8
            </h1>

			<div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-2 mx-auto max-w-7xl w-full place-items-center">
                {teamMember.map((member) => (
                    <TiltedCard
                        key={member.id}
                        imageSrc={'./images/frame_team.png'}
                        altText={member.nama + ' - ' + member.npm}
                        captionText={member.nama + ' - ' + member.npm}
                        containerHeight="320px"
                        containerWidth="260px"
                        imageHeight="100%"
                        imageWidth="100%"
                        rotateAmplitude={10}
                        scaleOnHover={1.2}
                        showMobileWarning={false}
                        showTooltip={true}
                        displayOverlayContent={true}
                        overlayContent={
                            <img
                                src={member.img}
                                alt={member.nama}
                                className="w-[90%] h-full object-cover"
                            />
                        }
                    />  
                    
                ))}
			</div>
		</div>
	);
};

export default TeamSection;
