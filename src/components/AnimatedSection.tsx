import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface Section {
  title: string;
  content: string;
  bgColor: string;
}

interface AnimatedSectionProps {
  sections: Section[];
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ sections }) => {
  return (
    <div>
      {sections.map((section, index) => (
        <Section key={index} {...section} />
      ))}
    </div>
  );
};

const Section: React.FC<Section> = ({ title, content, bgColor }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [isInView, mainControls]);

  return (
    <motion.section
      ref={ref}
      className={`h-screen flex items-center justify-center ${bgColor}`}
      initial="hidden"
      animate={mainControls}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <div className="text-center">
        <motion.h2
          className="text-4xl font-bold mb-4"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-xl"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {content}
        </motion.p>
      </div>
    </motion.section>
  );
};

export default AnimatedSection;