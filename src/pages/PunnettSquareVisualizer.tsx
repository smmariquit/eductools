import { useState } from 'react';
import VisualizerLayout from '../components/VisualizerLayout';

const PunnettSquareVisualizer = () => {
  const [parent1, setParent1] = useState('Rr');
  const [parent2, setParent2] = useState('Rr');

  const p1_alleles = parent1.split('');
  const p2_alleles = parent2.split('');

  const getPhenotype = (genotype: string) => genotype.includes('R') ? 'Red Flower' : 'White Flower';

  return (
    <VisualizerLayout
      title="Punnett Square Maker"
      description="Simulate Mendelian inheritance patterns (R = Red dominant, r = White recessive)."
      adSlotId="2005"
      educationalContent={
        <>
          <h2>Genetics and Heredity: Grade 8 Science</h2>
          <p>A Punnett square is a graphical representation of the possible genotypes of an offspring arising from a particular cross or breeding event.</p>
          <p>Dominant alleles (capital letters) mask recessive alleles (lowercase letters). In this example, the Red flower allele (R) is dominant over the White flower allele (r).</p>
        </>
      }
    >
      <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '50px 100px 100px', gridTemplateRows: '50px 100px 100px', gap: '5px', justifyContent: 'center' }}>
          <div></div>
          <div style={{ fontSize: '2rem', textAlign: 'center', alignSelf: 'end' }}>{p1_alleles[0]}</div>
          <div style={{ fontSize: '2rem', textAlign: 'center', alignSelf: 'end' }}>{p1_alleles[1]}</div>

          <div style={{ fontSize: '2rem', textAlign: 'right', paddingRight: '1rem', alignSelf: 'center' }}>{p2_alleles[0]}</div>
          <div style={{ background: 'var(--bg-color)', border: '2px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.5rem' }}>{p1_alleles[0]}{p2_alleles[0]}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{getPhenotype(p1_alleles[0]+p2_alleles[0])}</span>
          </div>
          <div style={{ background: 'var(--bg-color)', border: '2px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.5rem' }}>{p1_alleles[1]}{p2_alleles[0]}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{getPhenotype(p1_alleles[1]+p2_alleles[0])}</span>
          </div>

          <div style={{ fontSize: '2rem', textAlign: 'right', paddingRight: '1rem', alignSelf: 'center' }}>{p2_alleles[1]}</div>
          <div style={{ background: 'var(--bg-color)', border: '2px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.5rem' }}>{p1_alleles[0]}{p2_alleles[1]}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{getPhenotype(p1_alleles[0]+p2_alleles[1])}</span>
          </div>
          <div style={{ background: 'var(--bg-color)', border: '2px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.5rem' }}>{p1_alleles[1]}{p2_alleles[1]}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{getPhenotype(p1_alleles[1]+p2_alleles[1])}</span>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Parent 1 Genotype:</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <button onClick={() => setParent1('RR')} className={`btn ${parent1 === 'RR' ? 'btn-primary' : 'btn-outline'} btn-sm`} style={{ flex: 1 }}>RR</button>
            <button onClick={() => setParent1('Rr')} className={`btn ${parent1 === 'Rr' ? 'btn-primary' : 'btn-outline'} btn-sm`} style={{ flex: 1 }}>Rr</button>
            <button onClick={() => setParent1('rr')} className={`btn ${parent1 === 'rr' ? 'btn-primary' : 'btn-outline'} btn-sm`} style={{ flex: 1 }}>rr</button>
          </div>

          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Parent 2 Genotype:</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <button onClick={() => setParent2('RR')} className={`btn ${parent2 === 'RR' ? 'btn-primary' : 'btn-outline'} btn-sm`} style={{ flex: 1 }}>RR</button>
            <button onClick={() => setParent2('Rr')} className={`btn ${parent2 === 'Rr' ? 'btn-primary' : 'btn-outline'} btn-sm`} style={{ flex: 1 }}>Rr</button>
            <button onClick={() => setParent2('rr')} className={`btn ${parent2 === 'rr' ? 'btn-primary' : 'btn-outline'} btn-sm`} style={{ flex: 1 }}>rr</button>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default PunnettSquareVisualizer;
