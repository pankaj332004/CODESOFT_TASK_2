import React from 'react';
import Button from './Button';

export const EmptyState = ({
  icon,
  title = 'No Items Found',
  description = 'There are no items to display right now.',
  actionText,
  onAction,
}) => {
  return (
    <div className="qm-empty-state">
      {icon && <div className="qm-empty-icon-wrap">{icon}</div>}
      <h3 className="qm-empty-title">{title}</h3>
      <p className="qm-empty-desc">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
