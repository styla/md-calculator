import './App.css';
import { TagField } from './components/TagField';
import useTag from './hooks/useTag';

function App() {

  const { tags, handleAddTag, handleRemoveTag } = useTag();

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
                  tags={tags}
                  addTag={handleAddTag}
                  removeTag={handleRemoveTag}
                />
              </form>
            </fieldset>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
