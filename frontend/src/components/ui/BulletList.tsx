import React from 'react';

export interface BulletListProps {
  items: string[];
  className?: string;
  bulletClassName?: string;
  itemClassName?: string;
  as?: React.ElementType;
}

/**
 * Reużywalna lista punktowana z małą kropką w kolorze brand.
 * Zastępuje powtarzające się fragmenty:
 * <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
 */
export const BulletList: React.FC<BulletListProps> = ({
  items,
  className = 'space-y-2',
  bulletClassName = 'w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0',
  itemClassName = 'text-sm text-muted-foreground',
  as: Component = 'ul'
}) => {
  return (
    <Component className={className} role="list">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start">
          <div className={bulletClassName} aria-hidden="true" />
          <span className={itemClassName}>{item}</span>
        </li>
      ))}
    </Component>
  );
};

export default BulletList;
