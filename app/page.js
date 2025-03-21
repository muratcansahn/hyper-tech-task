import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import ProductList from './components/ProductList';
import CartSummary from './components/CartSummary';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Ürünlerimiz</h1>
        
        <CategoryFilter />
        <ProductList />
      </main>
      
      <CartSummary />
    </div>
  );
}
