import React from 'react';
import Hero from '../components/Hero';
import Courses from '../components/Courses';
import About from '../components/About';
import Feedbacks from '../components/Feedbacks';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <Courses />
      <About />
      <Feedbacks />
      <Gallery />
      <Contact />
    </>
  );
};

export default Home;