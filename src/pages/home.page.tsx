import React from 'react';
import { SearchBox } from '../lib/search';

export function HomePage() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <img
        style={styles.logo}
        src="https://www.kindpng.com/picc/m/156-1567373_rick-and-morty-logo-png-popsocket-rick-and.png"
      />
      <SearchBox className="mt-5" />
    </div>
  );
}

const styles = {
  logo: {
    width: 200,
  },
};
