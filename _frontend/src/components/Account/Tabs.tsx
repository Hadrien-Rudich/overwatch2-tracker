import { MouseEvent } from 'react';
import { authStore } from '../../store/authStore';

function Tabs() {
  const sections = [{ label: 'details' }, { label: 'security' }];
  const { setActiveTab, activeTab } = authStore();

  const handleActiveTab = (event: MouseEvent<HTMLButtonElement>) => {
    setActiveTab(event.currentTarget.value);
  };

  return (
    <div className="Tabs_container flexdiv relative top-4 divide-x divide-activeColor">
      {sections.map((section) => (
        <div key={section.label}>
          <h2>
            <button
              type="button"
              value={section.label}
              onClick={handleActiveTab}
              className={`${
                activeTab === section.label ? 'active' : 'inactive'
              }   
                accounttab flexdiv`}
            >
              {section.label}
            </button>
          </h2>
        </div>
      ))}
    </div>
  );
}

export default Tabs;
