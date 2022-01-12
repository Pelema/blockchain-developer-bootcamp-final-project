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
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{ fontWeight: 'bolder' }}>Highest Bid: {i.highestBid}</div>
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
