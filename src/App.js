import React from 'react';
import ActivityLogs from './components/ActivityLogs';

const logs = [
    { id: 1, message: 'Log 1' },
    { id: 2, message: 'Log 2' },
    { id: 3, message: 'Log 3' },
    // ...other logs
];

function App() {
    return (
        <div className="App">
            {/* ...existing code... */}
            <ActivityLogs logs={logs} />
            {/* ...existing code... */}
        </div>
    );
}

export default App;
