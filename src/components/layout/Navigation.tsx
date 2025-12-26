import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-lg font-bold">Apna Punjab Pizza Kebap</div>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-gray-300">Home</Link>
          <Link href="/menu" className="text-white hover:text-gray-300">Menù</Link>
          <Link href="/cart" className="text-white hover:text-gray-300">Carrello</Link>
          <Link href="/checkout" className="text-white hover:text-gray-300">Cassa</Link>
          <Link href="/orders" className="text-white hover:text-gray-300">Ordini</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;