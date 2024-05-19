import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <header>
        <nav>
          <h1>Home Page</h1>
          <Link to="/covid-tracker">Go to COVID-19 Tracker</Link>
        </nav>
      </header>
      <main>
        <section>
          <h2>Welcome to the COVID-19 Tracker</h2>
          <p>This website provides the latest COVID-19 data in Canada.</p>
        </section>
      </main>
    </div>
  );
}

export default Home;

