import React, { useState } from 'react';

const Accordion = ({ title, selectUser, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = (title) => {
        selectUser(title);
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const classNames = children && isOpen ? 'accordion-button' : 'accordion-button collapsed';

    return (
        <div className="accordion-item" data-testid="accordion-item">
            <h2 className="accordion-header" id={`collapseOne_${title}`} onClick={() => toggleAccordion(title)}>
                <button className={classNames} type="button">
                    {title}
                </button>
            </h2>
            {children && isOpen && (
                <div id={`collapseOne_${title}`} className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body">{children}</div>
                </div>
            )}
        </div>
    );
};

export default Accordion;