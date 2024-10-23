import { useState } from 'react';
import './App.css';
import { SingleLine } from './components/SingleLine';
import { TagField } from './components/TagField';
import useTag from './hooks/useDeveloper';
import { AvailabilityData, DevRow } from './types/types';

function generateAvailability(rows: number): AvailabilityData {
  // Create an array with the specified number of rows
  return Array.from({ length: rows }, () => Array(10).fill(1) as DevRow);
}


function App() {

  const { developers, handleAddDeveloper, handleRemoveDeveloper } = useTag();

  const [ availability, setAvailability ] = useState(generateAvailability(developers.length));

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <svg className='w-5 h-5'>
              <path d="M4 0h12v2H4zM2 16h12v2H2zM3 8h12v2H3zM0 4h11v2H0zM7 12h11v2H7z"/>
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-center">MD Calculator</h1>
          <div></div>
        </div>
      </header>

      <main className="p-4">
        <div className="max-w-7xl mx-auto flex gap-4">
          <div className="w-1/2 bg-white p-4 shadow rounded">
            <fieldset>
              <label className='font-bold'>MD Budget:</label>
              <input type="number" className='ml-4 pl-2' value="20" />
            </fieldset>
          </div>
          <div className="w-1/2 bg-white p-4 shadow rounded">
            <fieldset>
              <label className='font-bold'>Previous Sprint Carryover:</label>
              <input type="number" className='ml-4 pl-2' value="0" />
            </fieldset>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex gap-4 mt-4">
          <div className="w-full bg-white p-4 shadow rounded">
            <fieldset>
              <label className='font-bold'>Developers:</label>
              <form>
                <TagField
                  developers={developers}
                  addDeveloper={handleAddDeveloper}
                  removeDeveloper={handleRemoveDeveloper}
                />
              </form>
            </fieldset>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex gap-4 mt-4">
          <div className="w-full bg-white p-4 shadow rounded">
          <div className="grid grid-cols-11 gap-4">
            <div key={-1} className=""></div>
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index}>
                <span className='font-bold text-gray-200 w-5 block text-center'>{ index + 1 }</span>
              </div>
            ))}
          </div>
            { developers.map( (developer) => {
                return (
                  <SingleLine key={developer} name={ developer } />
                )
            } ) }
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
