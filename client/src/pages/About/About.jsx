import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="bout">
      <section className="about-section">
        <div className="about-content">
          <h1 className="about-title">About TaalCoach</h1>
          <p className="about-text">
            TaalCoach is a personalized language learning platform that connects
            learners with professional language coaches from around the world.
            Whether you are looking to learn a new language for travel, work, or
            personal growth, TaalCoach offers an accessible and flexible way to
            achieve your goals through tailored, 1-on-1 coaching sessions.
          </p>
          <p className="about-text">
            Through TaalCoach, users can easily search for coaches by language,
            experience, and availability, making it simple to find the right
            fit. Each coach brings a unique set of skills, ranging from
            conversational language learning to business communication, exam
            preparation, and more. You can book lessons based on your schedule
            and budget, ensuring that learning fits into your life seamlessly.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
