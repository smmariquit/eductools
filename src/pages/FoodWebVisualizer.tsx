import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdUnit from '../components/AdUnit';

const FoodWebVisualizer = () => {
  const [active, setActive] = useState('Palay (Rice)');
  const relations: Record<string, string[]> = {
    'Palay (Rice)': ['Tipaklong (Grasshopper)'],
    'Tipaklong (Grasshopper)': ['Palaka (Frog)'],
    'Palaka (Frog)': ['Ahas (Snake)'],
    'Ahas (Snake)': ['Philippine Eagle'],
    'Philippine Eagle': []
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="btn btn-outline">&larr; Back to Modules</Link>
      </div>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-color)' }}>Food Chain Visualizer (Sapot ng Pagkain)</h1>
        <p>Explore the flow of energy from local producers to apex predators in the Philippines.</p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '150px' }}>
          {Object.keys(relations).map((org, index, arr) => (
            <div key={org} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div 
                onClick={() => setActive(org)}
                style={{ 
                  padding: '1rem', background: active === org ? 'var(--accent-color)' : 'var(--bg-color)', 
                  border: '2px solid var(--border-color)', borderRadius: '50%',
                  cursor: 'pointer', transition: 'all 0.3s', textAlign: 'center', fontSize: '0.85rem'
                }}>
                {org}
              </div>
              {index < arr.length - 1 && (
                <div style={{ color: relations[org].includes(arr[index+1]) ? '#fbbf24' : 'var(--text-secondary)' }}>&rarr;</div>
              )}
            </div>
          ))}
        </div>
        <p style={{ marginTop: '2rem', fontSize: '1.2rem', color: '#fbbf24' }}>
          Energy flows from <strong>{active}</strong> {relations[active].length > 0 ? `to ${relations[active][0]}` : 'to decomposers'}.
        </p>
      </div>

      <article className="article-content">
        <h2>Ecosystems and Energy Flow: Philippine Context</h2>
        <p>A food chain shows how each living thing gets food, and how nutrients and energy are passed from creature to creature. In our local rice paddies and forests, these connections are vital.</p>
        <ul>
          <li><strong>Producers (Tagagawa):</strong> Plants like <em>Palay</em> that make their own food using sunlight.</li>
          <li><strong>Primary Consumers:</strong> Herbivores like the <em>Tipaklong</em> that eat crops.</li>
          <li><strong>Secondary/Tertiary Consumers:</strong> Carnivores like <em>Palaka</em> and <em>Ahas</em>.</li>
          <li><strong>Apex Predators:</strong> The majestic <em>Philippine Eagle (Haring Ibon)</em> sits at the top of the food chain!</li>
        </ul>
      </article>
      <AdUnit slotId="2002" format="auto" />
    </div>
  );
};
export default FoodWebVisualizer;
