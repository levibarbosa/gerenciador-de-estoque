/**
 * Formulário de Produto (ProductForm.jsx)
 * 
 * Responsável pela criação de novos produtos.
 * Gerencia o estado do formulário (nome, SKU, preço, quantidade).
 * Envia os dados para o hook useProducts ao salvar.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import { Save, ArrowLeft } from 'lucide-react';

const ProductForm = () => {
    const navigate = useNavigate();
    const { addProduct } = useProducts();

    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        quantity: 0,
        price: 0
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(formData);
        navigate('/products');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '1rem', border: 'none', paddingLeft: 0 }}>
                <ArrowLeft size={20} />
                Voltar
            </button>

            <div className="card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label className="label" htmlFor="name">Nome do Produto</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Ex: Camiseta Básica"
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label className="label" htmlFor="sku">SKU</label>
                            <input
                                type="text"
                                id="sku"
                                name="sku"
                                className="input"
                                value={formData.sku}
                                onChange={handleChange}
                                required
                                placeholder="Ex: CAM-001"
                            />
                        </div>
                        <div>
                            <label className="label" htmlFor="price">Preço (R$)</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                className="input"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label" htmlFor="quantity">Quantidade Inicial</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            className="input"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={() => navigate('/products')} className="btn btn-outline">
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <Save size={20} />
                            Salvar Produto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
