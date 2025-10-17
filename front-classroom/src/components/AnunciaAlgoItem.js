import React, { useState } from "react";
import AvisoForm from "../forms/AvisoForm";

function AnuncioAlgoItem({ classId, onSuccess }) {
    const [expanded, setExpanded] = useState(false);
    let icon = "/svg/icons8-user.svg";

    // Toggle form visibility
    const handleClick = (e) => {
        // Prevent clicks coming from inside the form (like buttons) from re-toggling
        if (e && e.target && e.target.closest('.aviso-form')) return;
        setExpanded((v) => !v);
    };

    const handleSuccess = () => {
        setExpanded(false);
        if (typeof onSuccess === 'function') onSuccess();
    };

    return (
        <div className="publication-item" style={{ cursor: 'pointer' }}>
            <div className="publication-header" onClick={handleClick}>
                <div className="publication-left">
                    <div className="publication-icon">
                        <img src={icon} alt="user icon" width={24}/>
                    </div>
                </div>

                <div className="publication-content">
                    <p className="s-hver">Anuncia algo a tu clase.</p>
                </div>
            </div>

            {expanded && (
                <div className="publication-form">
                    <AvisoForm onSuccess={handleSuccess} />
                </div>
            )}
        </div>
    );
}

export default AnuncioAlgoItem;