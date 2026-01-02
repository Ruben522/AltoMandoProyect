// App.jsx (Tu layout base)

import React from 'react';
import Menu from './components/Menu'; // Usando tu componente Menu
import Rutas from './routes/Rutas'; // Importando el componente de rutas

const App = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-md">
                <Menu /> 
            </header>
            
            <main className="flex-grow">
                <Rutas />
            </main>
        </div>
    );
};

export default App;