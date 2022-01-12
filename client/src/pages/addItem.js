import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Label, FormGroup } from 'reactstrap';
import { addItem } from '../web3Client'
import CustomModal from '../components/modal'
import { useForm } from 'react-hook-form'


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
        backgroundColor: 'red',
        height: '300px',
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
}
function AddItem() {
    const [modalIsOpen, setIsOpen] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = (formData) => {
        setIsLoading(true)
        addItem(formData.title, formData.basePrice, formData.description, formData.imgUrl)
        .then(res=>{
            setIsLoading(false)
            reset()

            console.log(res)
        })
        .catch(err=>{
            setIsLoading(false)
            console.log(err)
        })
    }

    useEffect(() => {

    }, [])
    return (
        <div style={styles.itemContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <FormGroup>
                        <Col>
                            <Label>Base price</Label>
                            <input className='form-control' {...register("basePrice")}></input>
                        </Col>

                    </FormGroup>
                    <FormGroup>
                        <Col>
                            <Label>Title</Label>
                            <input className='form-control' {...register("title")}></input>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                            <Label>Description</Label>
                            <input className='form-control' {...register("description")}></input>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                            <Label>Img Url</Label>
                            <input className='form-control' {...register("imgUrl")}></input>
                        </Col>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Col>
                            <Input type="submit" disabled={isLoading} value="Submit" className='btn btn-primary'/>
                        </Col>
                    </FormGroup>
                </Row>
            </form>
            <CustomModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}></CustomModal>
        </div>
    );
}

export default AddItem;
