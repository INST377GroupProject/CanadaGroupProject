import React from 'react';
import DataFetcher from './DataFetcher';

function CovidTracker() {
  return (
    <div>
      <header>
        <nav>
          <h1>COVID-19 Tracker</h1>
        </nav>
      </header>
      <main>
        <section>
          <h2>COVID-19 Summary</h2>
          <DataFetcher />
        </section>
      </main>
    </div>
  );
}

export default CovidTracker;
