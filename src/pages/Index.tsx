import { useState } from 'react';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingShapes } from '@/components/FloatingShapes';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { InterestsSection } from '@/components/InterestsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { HireMeModal } from '@/components/HireMeModal';
import { ScrollContainer } from '@/components/ScrollContainer';

const Index = () => {
    const [isHireModalOpen, setIsHireModalOpen] = useState(false);

    return (
        <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">
            <AnimatedBackground />
            <FloatingShapes />

            <div className="relative z-10">
                <Navigation onHireMeClick={() => setIsHireModalOpen(true)} />

                <ScrollContainer>
                    <HeroSection onHireMeClick={() => setIsHireModalOpen(true)} />
                    <AboutSection />
                    <SkillsSection />
                    <ExperienceSection />
                    <InterestsSection />
                    <ProjectsSection />
                    <ContactSection />
                </ScrollContainer>

                <Footer />
            </div>

            <HireMeModal
                isOpen={isHireModalOpen}
                onClose={() => setIsHireModalOpen(false)}
            />
        </div>
    );
};

export default Index;
