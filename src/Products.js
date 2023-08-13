import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Loading from './components/Loading';

const Products = () => {
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const getProducts = () => {
      fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        const allProducts = data.map((item, _) => {
          return {
            ...item, 
            title: item.title.length > 40 ? item.title.slice(0, 40) + '...' : item.title,item,
            description: item.description.slice(0, 60) + '...'
          }
        });        
        setProducts(allProducts);
      });
    }
    if( products.length === 0 ) 
      getProducts();

  },[products]);

    return (
        <>
          <div className='my-10 text-center'>
            <Typography variant="h1" className="text-2xl">Products</Typography>
            <Typography variant="paragraph">
              Material Tailwind is an easy to use components library for Tailwind CSS
              and Material Design. It provides a simple way to customize your
              components, you can change the colors, fonts, breakpoints and everything
              you need.
            </Typography>
          </div>
          {isLoading && <Loading/>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {products.map((item, _) => (
            <div key={item.id}>
              <Card className="w-full shadow-lg">
                <CardHeader floated={false} color="blue-gray" className="h-52">
                  <img
                    src={item.image}
                    alt={item.title}
                  />
                  <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                </CardHeader>
                <CardBody>
                  <div className="mb-3 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray" className="min-h-[60px] font-medium">{item.title}</Typography>
                    <Typography
                      color="blue-gray"
                      className="flex items-center gap-1.5 font-normal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="-mt-0.5 h-5 w-5 text-yellow-700"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item.rating.rate}
                    </Typography>
                  </div>
                  <Typography color="gray">{item.description}</Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Link to={`/reactjs-shopping/product/${item.id}`}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                    <Button ripple={false} fullWidth={true} >Ver</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </>
    );
}

export default Products