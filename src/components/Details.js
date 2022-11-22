/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';

import close from '../assets/close.svg';

const Details = ({ home, provider, account, escrow, togglePop }) => {
    const [hasBought, setHasBought] = useState(false)
    const [hasLended, setHasLended] = useState(false)
    const [hasInspected, setHasInspected] = useState(false)
    const [hasSold, setHasSold] = useState(false)

    const [buyer, setBuyer] = useState(null)
    const [lender, setLender] = useState(null)
    const [inspector, setInspector] = useState(null)
    const [seller, setSeller] = useState(null)

    const [owner, setOwner] = useState(null)

    const fetchDetails = async () => {
        // -- Buyer
        const buyer = await escrow.buyer(home.id)
        setBuyer(buyer)

        const hasBought = await escrow.approval(home.id, buyer)
        setHasBought(hasBought)

        // -- Seller
        const seller = await escrow.seller()
        setSeller(seller)

        const hasSold = await escrow.approval(home.id, seller)
        setHasSold(hasSold)

        // -- Lender
        const lender = await escrow.lender()
        setLender(lender)

        const hasLended = await escrow.approval(home.id, lender)
        setHasLended(hasLended)

        // -- Inspector
        const inspector = await escrow.inspector()
        setInspector(inspector)

        const hasInspected = await escrow.inspectionPassed(home.id)
        setHasInspected(hasInspected)
    }

    const fetchOwner = async () => {
        if (await escrow.isListed(home.id)) return

        const owner = await escrow.buyer(home.id)
        setOwner(owner)
    }

    const buyHandler = async () => {
        const escrowAmount = await escrow.escrowAmount(home.id)
        const signer = await provider.getSigner()

        // Buyer deposit earnest
        let transaction = await escrow.connect(signer).depositEarnest(home.id, { value: escrowAmount })
        await transaction.wait()

        // Buyer approves...
        transaction = await escrow.connect(signer).approveSale(home.id)
        await transaction.wait()

        setHasBought(true)
    }

    const inspectHandler = async () => {
        const signer = await provider.getSigner()

        // Inspector updates status
        const transaction = await escrow.connect(signer).updateInspectionStatus(home.id, true)
        await transaction.wait()

        setHasInspected(true)
    }

    const lendHandler = async () => {
        const signer = await provider.getSigner()

        // Lender approves...
        const transaction = await escrow.connect(signer).approveSale(home.id)
        await transaction.wait()

        // Lender sends funds to contract...
        const lendAmount = (await escrow.purchasePrice(home.id) - await escrow.escrowAmount(home.id))
        await signer.sendTransaction({ to: escrow.address, value: lendAmount.toString(), gasLimit: 60000 })

        setHasLended(true)
    }

    const sellHandler = async () => {
        const signer = await provider.getSigner()

        // Seller approves...
        let transaction = await escrow.connect(signer).approveSale(home.id)
        await transaction.wait()

        // Seller finalize...
        transaction = await escrow.connect(signer).finalizeSale(home.id)
        await transaction.wait()

        setHasSold(true)
    }

    useEffect(() => {
        fetchDetails()
        fetchOwner()
    }, [hasSold])

    return (
        <div className="max-w-6xl mx-auto absolute bg-gray-900/90 top-24 left-0 right-0">
           
                {/* <div className="home__image">
                    <img  src={home.image} alt="Home" />
                </div>
                <div className="home__overview">
                    <h1>{home.name}</h1>
                    <p>
                        <strong>{home.attributes[2].value}</strong> bds |
                        <strong>{home.attributes[3].value}</strong> ba |
                        <strong>{home.attributes[4].value}</strong> sqft
                    </p>
                    <p>{home.address}</p>

                    <h2>{home.attributes[0].value} ETH</h2>

                    {owner ? (
                        <div className='home__owned'>
                            Owned by {owner.slice(0, 6) + '...' + owner.slice(38, 42)}
                        </div>
                    ) : (
                        <div>
                            {(account === inspector) ? (
                                <button className='home__buy' onClick={inspectHandler} disabled={hasInspected}>
                                    Approve Inspection
                                </button>
                            ) : (account === lender) ? (
                                <button className='home__buy' onClick={lendHandler} disabled={hasLended}>
                                    Approve & Lend
                                </button>
                            ) : (account === seller) ? (
                                <button className='home__buy' onClick={sellHandler} disabled={hasSold}>
                                    Approve & Sell
                                </button>
                            ) : (
                                <button className='home__buy' onClick={buyHandler} disabled={hasBought}>
                                    Buy
                                </button>
                            )}

                            <button className='home__contact'>
                                Contact agent
                            </button>
                        </div>
                    )}

                    <hr />

                    <h2>Overview</h2>

                    <p>
                        {home.description}
                    </p>

                    <hr />

                    <h2>Facts and features</h2>

                    <ul>
                        {home.attributes.map((attribute, index) => (
                            <li key={index}><strong>{attribute.trait_type}</strong> : {attribute.value}</li>
                        ))}
                    </ul>
                </div> */}

            <div className="relative p-6 flex-auto">
                  <div className="my-4 text-slate-500 text-lg leading-relaxed">
                     
                  <div className='w-full'>

                      <div className='mx-4'>

                      <section>
                      <div className="relative max-w-screen-xl px-4 py-8 mx-auto">
                          <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
                          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                              <div className="aspect-w-1 aspect-h-1">
                              <img
                                  alt="Mobile Phone Stand"
                                  className="object-cover w-[800px] rounded-xl"
                                  src={home.image}
                              />
                              </div>

                              <div className="grid grid-cols-2 gap-4 lg:mt-4">
                              <div className="aspect-w-1 aspect-h-1">
                                  <img
                                  alt="Mobile Phone Stand"
                                  className="object-cover lg:h-48 h-24 rounded-xl"
                                  src={home.image}
                                  />
                              </div>

                              <div className="aspect-w-1 aspect-h-1">
                                  <img
                                  alt="Mobile Phone Stand"
                                  className="object-cover lg:h-48 h-24  rounded-xl"
                                  src={home.image}
                                  />
                              </div>

                            
                              </div>
                          </div>

                          <div className="sticky top-0">
                          <strong className="border border-green-600 rounded-full tracking-wide px-3 font-medium py-0.5 text-xs bg-gray-100 text-green-600"> 
                          {home.name}
                          </strong>

                              <div class="flex justify-between mt-8">
                              <div className="max-w-[35ch]">
                                  <h1 className="text-2xl font-bold text-white">
                                  {home.address}
                                  </h1>

                                  <p className="mt-0.5 text-sm">
                                  Highest Rated
                                  </p>

                                  {/* <div class="flex mt-2 -ml-0.5">
                                  <svg
                                      className="w-5 h-5 text-yellow-400"
                                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                  >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>

                                  <svg
                                      className="w-5 h-5 text-yellow-400"
                                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                  >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>

                                  <svg
                                      className="w-5 h-5 text-yellow-400"
                                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                  >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>

                                  <svg
                                      className="w-5 h-5 text-yellow-400"
                                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                  >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>

                                  <svg
                                      className="w-5 h-5 text-gray-200"
                                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                  >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  </div> */}
                              </div>

                              <p className="text-lg font-bold text-white">
                                {home.attributes[0].value} ETH
                              </p>
                              </div>

                              <details className="relative mt-4 group">
                              <summary className="block">
                                  <div>
                                  <div className="prose max-w-none group-open:hidden">
                                      <p className='text-white'>
                                      {home.description.slice(0, 20)}
                                      </p>
                                  </div>

                                  <span className="mt-4 text-sm font-medium underline cursor-pointer group-open:absolute group-open:bottom-0 group-open:left-0 group-open:mt-0">
                                      Read More
                                  </span>
                                  </div>
                              </summary>

                              <div className="pb-6 prose max-w-none text-white">
                              {home.description}
                              </div>
                              </details>

                              <form className="mt-8">

                              <p className="text-lg inline-flex font-medium">
                              <dl className="flex items-center mt-6 space-x-8 text-xs">
                                  <div className="sm:inline-flex sm:items-center sm:shrink-0">
                                      <svg
                                      className="w-4 h-4 text-green-500"
                                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                      >
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                      </svg>

                                      <div className="sm:ml-3 mt-1.5 sm:mt-0">
                                      <dt className="text-gray-100">
                                          Space
                                      </dt>

                                      <dd className="font-medium text-gray-100">
                                      {home.attributes[4].value} sqft
                                      </dd>
                                      </div>
                                  </div>

                                  <div className="sm:inline-flex sm:items-center sm:shrink-0">
                                      <svg
                                      className="w-4 h-4 text-green-500"
                                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                      >
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                      </svg>

                                      <div className="sm:ml-3 mt-1.5 sm:mt-0">
                                      <dt className="text-gray-100">
                                          Bathroom
                                      </dt>

                                      <dd className="font-medium text-gray-100">
                                      {home.attributes[3].value} rooms
                                      </dd>
                                      </div>
                                  </div>

                                  <div className="sm:inline-flex sm:items-center sm:shrink-0">
                                      <svg
                                      className="w-4 h-4 text-green-500"
                                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                      >
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                      </svg>

                                      <div className="sm:ml-3 mt-1.5 sm:mt-0">
                                      <dt className="text-gray-100">
                                          Bedroom
                                      </dt>

                                      <dd className="font-medium text-gray-100">
                                      {home.attributes[2].value}  rooms
                                      </dd>
                                      </div>
                                  </div>
                                  </dl>
                              </p>
                              
                              <div className="flex mt-8">
                              {owner ? (
                                <a
                                className="w-full text-center cursor-pointer items-center px-8 py-3 mt-8 text-white bg-green-600 border border-green-600 rounded hover:bg-transparent hover:text-green-600 active:text-green-500 focus:outline-none focus:ring"
                                onClick={buyHandler} disabled={hasBought}
                                type="submit"
                                >
                                <span className="text-lg font-medium">
                                Owned by {owner.slice(0, 6) + '...' + owner.slice(38, 42)}
                                </span>
                                </a>
                              ) : (
                             <div>
                                {(account === inspector) ? (
                                         <a
                                         className="w-full text-center cursor-pointer items-center px-8 py-3 mt-8 text-white bg-green-600 border border-green-600 rounded hover:bg-transparent hover:text-green-600 active:text-green-500 focus:outline-none focus:ring"
                                         onClick={inspectHandler} disabled={hasInspected}
                                         type="submit"
                                         >
                                         <span className="text-lg font-medium">Approve Inspection</span>
                                         </a>
                                ) : 
                                (account === lender) ? (
                                    <a
                                    className="w-full text-center cursor-pointer items-center px-8 py-3 mt-8 text-white bg-green-600 border border-green-600 rounded hover:bg-transparent hover:text-green-600 active:text-green-500 focus:outline-none focus:ring"
                                    onClick={lendHandler} disabled={hasLended}
                                    type="submit"
                                    >
                                    <span className="text-lg font-medium">Approve & Lend</span>
                                    </a>
                                ) :
                                (account === seller) ? (
                                    <a
                                    className="w-full text-center cursor-pointer items-center px-8 py-3 mt-8 text-white bg-green-600 border border-green-600 rounded hover:bg-transparent hover:text-green-600 active:text-green-500 focus:outline-none focus:ring"
                                    onClick={sellHandler} disabled={hasSold}
                                    type="submit"
                                    >
                                    <span className="text-lg font-medium">Approve & Sell</span>
                                    </a>
                                ) : (
                                <a
                                    className="w-full text-center cursor-pointer items-center px-8 py-3 mt-8 text-white bg-green-600 border border-green-600 rounded hover:bg-transparent hover:text-green-600 active:text-green-500 focus:outline-none focus:ring"
                                    onClick={buyHandler} disabled={hasBought}
                                    type="submit"
                                    >
                                    <span className="text-lg font-medium">Buy Property</span>
                                </a>
                                )
                                } 
                             </div>
                              )
                            }
                              </div>
                              </form>
                          </div>
                          </div>
                      </div>
                      </section>

                    
                  </div>

                  </div>
                                   
                  </div>
                </div>


                <button onClick={togglePop} className="absolute hover:bg-green-600 top-2 left-2 w-8 h-8 bg-white cursor-pointer border-none">
                    <img className='w-6 h-6 mx-auto' src={close} alt="Close" />
                </button>
            
        </div >
    );
}

export default Details;