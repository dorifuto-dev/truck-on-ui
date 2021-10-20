import React from 'react';
// import { DialogContent, DialogOverlay } from '@reach/dialog';
import './FilterModal.scss';

const FilterModal = React.forwardRef(({children, options, resetFilters, onApply, onDismiss}, ref) => {
    return (
      <>
        <div className="filter-modal" >
          <div
            ref={ref}
            className="filter-modal-wrapper"
            aria-label="modal window"
          >
            <div className="filter-modal-header">
              <button onClick={resetFilters}>Reset Filters</button>
              <button onClick={onDismiss}>✕</button>  
            </div>
            <div className="filter-modal-content">{options}</div>         
            <div className="filter-modal-actions">
              <button onClick={onApply}>Apply Filters</button>
            </div>
          </div>
        </div>
      </>
    );
  });
export default FilterModal;