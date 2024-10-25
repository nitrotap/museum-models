import React, { useState } from 'react';

interface Model {
    id: string;
    name: string;
    url: string;
}

const AdminPage: React.FC = () => {
    const [models, setModels] = useState<Model[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Handle file selection
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setSelectedFile(file);
    };

    // Handle model upload
    const handleUpload = () => {
        if (selectedFile) {
            const newModel: Model = {
                id: Math.random().toString(36).substr(2, 9),
                name: selectedFile.name,
                url: URL.createObjectURL(selectedFile), // Convert file to URL for preview
            };
            setModels([...models, newModel]); // Add model to state
            setSelectedFile(null); // Clear the selected file
        }
    };

    // Handle model deletion
    const handleDelete = (modelId: string) => {
        setModels(models.filter((model) => model.id !== modelId));
    };

    return (
        <div>
            <h1>Admin Page</h1>

            {/* File upload section */}
            <div>
                <input type="file" accept=".glb,.gltf,.obj" onChange={handleFileSelect} />
                <button onClick={handleUpload} disabled={!selectedFile}>
                    Upload Model
                </button>
            </div>

            {/* Model list */}
            <h2>Uploaded Models</h2>
            <ul>
                {models.map((model) => (
                    <li key={model.id}>
                        <p>{model.name}</p>
                        <button onClick={() => handleDelete(model.id)}>Delete</button>
                        {/* Model Preview (if necessary) */}
                        <button onClick={() => window.open(model.url)}>Preview</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;
