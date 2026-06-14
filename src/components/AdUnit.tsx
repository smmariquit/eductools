interface AdUnitProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

const AdUnit = ({ slotId = '0000000000', format = 'auto', className = '' }: AdUnitProps) => {
  return null;
};

export default AdUnit;
