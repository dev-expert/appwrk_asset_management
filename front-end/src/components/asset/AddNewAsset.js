import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {GET_Components,addAssetMutation,GET_Assets} from '../../queries/queries';
import * as compose from 'lodash.flowright';
import MenuItem from '@material-ui/core/MenuItem';
import {graphql} from 'react-apollo';

class AddNewAsset extends React.Component{
    
    constructor(props)
    {
        const date=Date().toString();
        super(props);
        this.state={
            assetName:"",
            serialNo:"",
            manufacturer:"",
            description:"",
            expiryDate:"",
            color:"",
            purchaseDate:"",
            purchaseCost:"",
            owner:"",
            status:"",
            createdBy:"AppWrk",
            modifiedBy:"AppWrk",
            createdDate:date,
            modifiedDate:date,
            message:"",
            componentId:"",
        }
    }
    components()
    {
        var data= this.props.GET_Components;
        if(data.loading)
        {
            return(<div>Loading Components....</div>)
        }
        else
        {
            return  data.components && data.components.map((row, index) => (
                         <MenuItem key={row._id} value={row._id}>{row.componentName}</MenuItem>
            ))
                    
        }
    }  
    changeSelectComponent=(e)=>{
        this.setState({
            componentId:e.target.value,
         })
    }
    submitAsset=(e)=>{
        e.preventDefault();
        this.props.addAssetMutation({
            variables:{
                assetName:this.state.assetName,
                serialNo:this.state.serialNo,
                manufacturer:this.state.manufacturer,
                description:this.state.description,
                expiryDate:this.state.expiryDate,
                color:this.state.color,
                purchaseDate:this.state.purchaseDate,
                purchaseCost:parseInt(this.state.purchaseCost),
                owner:this.state.owner,
                status:this.state.status,
                createdBy:this.state.createdBy,
                modifiedBy:this.state.modifiedBy,
                createdDate:this.state.createdDate,
                modifiedDate:this.state.modifiedDate,
                componentId:this.state.componentId,
            },
            refetchQueries:[{query:GET_Assets}]
        });
    }

    render(){
      return(
        
        <Container component="main" maxWidth="md">
          
        <div>
        
            <Typography component="h1" variant="h5">
                Add New Asset
            </Typography>
            <form onSubmit={this.submitAsset.bind(this)}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                <TextField
                    name="assetName"
                    variant="outlined"
                    required
                    fullWidth
                    label="Asset Name"
                    autoFocus
                    value={this.state.assetName}
                    onChange={(e)=>{this.setState({assetName:e.target.value})}}
                />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Serial Number"
                    name="serialNumber"
                    value={this.state.serialNo}
                    onChange={(e)=>{this.setState({serialNo:e.target.value})}}
                />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Manufacturer"
                    name="manufacturer"
                    value={this.state.manufacturer}
                    onChange={(e)=>{this.setState({manufacturer:e.target.value})}}
                />
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Description"
                    name="description"
                    value={this.state.description}
                    onChange={(e)=>{this.setState({description:e.target.value})}}
                />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Select
                        value={this.state.componentId}
                        fullWidth
                        required
                        input={<OutlinedInput onChange={(e)=>{this.changeSelectComponent(e)}} name="category_name" id="outlined-age-simple" />}
                        >
                          {this.components()}
                    </Select>
                </Grid>

                <Grid item xs={12} sm={4}>
                <TextField
                    name="expiryDate"
                    variant="outlined"
                    required
                    fullWidth
                    label="Expiry Date"
                    autoFocus
                    value={this.state.expiryDate}
                    onChange={(e)=>{this.setState({expiryDate:e.target.value})}}
                />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Color"
                    name="color"
                    value={this.state.color}
                    onChange={(e)=>{this.setState({color:e.target.value})}}
                />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Purchase Date"
                    name="purchaseDate"
                    value={this.state.purchaseDate}
                    onChange={(e)=>{this.setState({purchaseDate:e.target.value})}}
                />
                </Grid>
            
                <Grid item xs={12} sm={4}>
                <TextField
                    name="purchaseCost"
                    variant="outlined"
                    required
                    fullWidth
                    label="Purchase Cost"
                    value={this.state.purchaseCost}
                    onChange={(e)=>{this.setState({purchaseCost:e.target.value})}}

                />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Owner"
                    name="owner"
                    value={this.state.owner}
                    onChange={(e)=>{this.setState({owner:e.target.value})}}
                />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Status"
                    name="status"
                    value={this.state.status}
                    onChange={(e)=>{this.setState({status:e.target.value})}}
                />
                </Grid>
                

            </Grid>
            <br/>
            <Grid item xs={12} sm={4}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                
            >
                Add Asset
            </Button>
            </Grid>
            </form>
        </div>
        
        </Container>
    );
    }
}

export default compose(
    graphql(GET_Components,{name:"GET_Components"}),
    graphql(addAssetMutation,{name:"addAssetMutation"})
)(AddNewAsset)