interface AdUnitProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

const AdUnit = ({ slotId = '0000000000', format = 'auto', className = '' }: AdUnitProps) => {
  return (
    <div className={`ad-placeholder ${className}`}>
      <strong>Advertisement</strong><br/>
      <small>Google Ad Slot ({format}) - ID: {slotId}</small>
    </div>
  );
};

export default AdUnit;
