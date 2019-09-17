import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios';

class FileUpload extends Component {
    constructor(){
        super();
        this.state = {
            uploading: false,
            uploadedFiles: []
        }
    }

    onDrop = (files = []) => {
        this.setState({uploading: true})
        let formData = new FormData()
        const config = {
            header: {'content-type':'multipart/form-data'}
        }
        formData.append('file', files[0])   //cause we have one file
        Axios.post('/api/users/uploadimage',formData,config)
            .then(response => {
                console.log(response.data)

                this.setState({
                    uploading: false,
                    uploadedFiles: [
                        ...this.state.uploadedFiles,
                        response.data
                    ]
                },()=>{
                    this.props.imagesHandler(this.state.uploadedFiles)  //we are sending it back to parent component add_product
            })
        })
        //wez formdata, dołącz do niego plik
        //wyślij na endpoint z multipart/form-data  dane z nim
        //zmien w odpowiedzi stan apki

        //imagesHandler na koniec wywolaj, i obsluz w add_product
    }

    onRemove = (id) => {
        Axios.get(`/api/users/removeimage?public_id=${id}`) 
            .then(response=>{
                let images = this.state.uploadedFiles.filter(item=>{
                    return item.public_id !== id
                })

                this.setState({
                    uploadedFiles: images
                },()=> {
                    this.props.imagesHandler(images)
                })
            })
    }

    showUploadedImages = () => {
        this.state.uploadedFiles.map(item=>(
            <div className='dropzone_box'
                key={item.public_id}
                onClick={()=> this.onRemove(item.public_id)}
            >
                <div className='wrap'>
                    style={{background:`url(${item.url}) no-repeat`}}
                </div>
            </div>
        ))
    }

    static getDerivedStateFromProps(props, state){
        if(props.reset){
            return state = {
                uploadedFiles: []
            }
        }
        return null;
    }



    render() {
        return (
            <div>
                <section>
                    <div className='dropzone clear'>
                        <Dropzone
                            onDrop={(e)=>this.onDrop(e)}
                            multiple={false}
                            className='dropzone_box'
                        >
                            <div className="wrap">
                                <FontAwesomeIcon
                                    icon={faPlusCircle}
                                />
                            </div>
                        </Dropzone>
                        {this.showUploadedImages()}
                        {
                            this.state.uploading ?
                            <div className="dropzone_box" style={{
                                textAlign: 'center',
                                paddingTop: '50px'
                            }}>
                                <CircularProgress
                                    style={{color:'#aagcd4'}}
                                    thickness={3}
                                />
                            </div>
                            :null
                        }
                    </div>
                </section>
            </div>
        );
    }
}

export default FileUpload;