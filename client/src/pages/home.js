import Web3 from 'web3'
import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import { getItems } from '../web3Client'
import CustomModal from '../components/modal'



const styles = {
  item: {
    // flexGrow: '1'
  },
  itemContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 10%',
  },
  itemInner: {
    margin: '10px',
    height: '350px',
    width: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
}
function Home() {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [modalIsOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getItems()
      .then(data => {
        console.log(data)
        setItems(data)
      })
      .catch(err => { console.log(err) })
  }, [])
  return (
    <div style={styles.itemContainer}>
      {items.map(((i) => {
        return <div style={styles.item} key={i.itemId}>
          <div style={styles.itemInner}>
            <div style={{ flexGrow: '1', position: 'relative', overflowY: 'hidden' }}>
              <Link to='/product'>
                {/* <div style={{ height: '100%' }}>
                  {i.title}
                </div> */}
                <img src={i.imgUrl} style={{ width: '100%' }} />
              </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{flexGrow: 1}}>
                <div style={{overflowX: 'hidden', textOverflow: 'ellipsis', flexWrap: 'nowrap', maxWidth: '200px', whiteSpace: 'nowrap'}}><span style={{fontWeight: 'bold'}}>Min Bid:</span> {Web3.utils.fromWei(i.basePrice)}</div>
                <div style={{overflowX: 'hidden', textOverflow: 'ellipsis', flexWrap: 'nowrap', maxWidth: '200px', whiteSpace: 'nowrap'}}><span style={{fontWeight: 'bold'}}>Highest Bid:</span> {Web3.utils.fromWei(i.highestBid)}</div>
                <div style={{overflowX: 'hidden', textOverflow: 'ellipsis', flexWrap: 'nowrap', maxWidth: '200px', whiteSpace: 'nowrap'}}><span style={{fontWeight: 'bold'}}>Highest Bidder:</span> {i.highestBidder ? i.highestBidder : 'None'}</div>
              </div>
              <Button style={{ padding: '15px' }} onClick={() => { setSelectedItem(i.itemId); setIsOpen(true) }}>Bid</Button>
            </div>
          </div>
        </div>
      }))}
      <CustomModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} itemId={selectedItem}></CustomModal>
    </div>
  );
}

export default Home;
