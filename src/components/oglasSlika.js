import React, { Component } from "react";
import MyButton from "../util/MyButton";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { uploadImage } from "../redux/actions/dataActions";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

export class oglasSlika extends Component {
  constructor(props) {
    super(props);

    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    console.log(formData);
    this.props.uploadImage(formData, this.props.ID, this.props.history);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  render() {
    const imageUrl = this.props.oglas.item.imgUrl;
    return (
      <div className="image-wrapper">
        <input
          type="file"
          id="imageInput"
          hidden="hidden"
          onChange={this.handleImageChange}
        />
        <AddAPhotoIcon />
        <MyButton
          tip="Postavi sliku za oglas"
          onClick={this.handleEditPicture}
          btnClassName="button"
        >
          <EditIcon color="primary" />
        </MyButton>
      </div>
    );
  }
}

oglasSlika.propTypes = {
  oglas: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ID: state.oglas.item.id,
  oglas: state.oglas,
});

export default connect(mapStateToProps, { uploadImage })(oglasSlika);
