import React, { Component } from "react";
import { Card, Button, Modal, CardGroup, Form } from "react-bootstrap";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import CardMedia from "@material-ui/core/CardMedia";
import MyButton from "../util/MyButton";
import axios from "axios";
import { connect } from "react-redux";
import { updateImage, updateOglase } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
const style = {
  layout: {
    marginTop: "30px",
  },
  Img: {
    minwidth: "260px",
    minHeight: "220px",
    maxwidth: "260px",
    maxHeight: "220px",
  },
  media: {
    height: "140px",
    width: "195px",
  },
  progress: {
    position: "absolute",
    marginLeft: -50,
  },
  button: {
    marginTop: 20,
    marginLeft: 200,
    position: "relative",
  },
};

class Cardi2 extends Component {
  constructor() {
    super();
    this.state = {
      body: "",
      naslov: "",
      cena: "",
      show: false,
      setShow: false,
      errors: [],
      loading: false,
    };
  }

  render() {
    const handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      this.setState({
        loading: true,
      });
      let oglasData = {};
      if (this.state.naslov == "") oglasData.naslov = this.props.oglas.naslov;
      else oglasData.naslov = this.state.naslov;
      if (this.state.body == "") oglasData.body = this.props.oglas.body;
      else oglasData.body = this.state.body;
      if (this.state.cena == "") oglasData.cena = this.props.oglas.cena;
      else oglasData.cena = this.state.cena;

      console.log(oglasData);
      this.props.updateOglase(oglasData, oglasId, this.props.history);
    };

    const { show, setShow } = this.state;

    const handleEditPicture = () => {
      const fileInput = document.getElementById("imageInput");
      fileInput.click();
    };

    const handleImageChange = (event) => {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append("image", image, image.name);
      console.log(formData);
      this.props.updateImage(formData, oglasId, this.props.history);
    };
    const handleClose = () => {
      this.setState({
        show: false,
      });
    };
    const handleShow = () => {
      this.setState({
        show: true,
      });
    };
    const deleteOglas = () => {
      axios
        .delete(`/oglas/${oglasId}`)
        .then((msg) => {
          console.log(msg);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const {
      oglas: { naslov, body, datum, imgUrl, korisnik, cena, oglasId },
    } = this.props;

    const { errors, loading } = this.state;
    dayjs.extend(relativeTime);
    return (
      <div>
        <CardGroup>
          <Card size="lg" style={style.layout}>
            <Card.Img style={style.Img} variant="top" src={imgUrl} />
            <Card.Body>
              <Card.Title>{naslov}</Card.Title>

              <Button variant="outlined-primary" onClick={handleShow}>
                {" "}
                <EditIcon />{" "}
              </Button>
              <Button variant="outlined-primary" onClick={deleteOglas}>
                {" "}
                <DeleteOutlineIcon />{" "}
              </Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{dayjs(datum).fromNow()}</small>
            </Card.Footer>
          </Card>
        </CardGroup>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{korisnik}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <TextField
                  required
                  name="naslov"
                  id="standard-required"
                  label="Naslov"
                  defaultValue={naslov}
                  fullWidth
                  onChange={handleChange}
                />
                <br />
                <br />
              </Form.Group>
              <Form.Group>
                <TextField
                  required
                  name="body"
                  id="standard-required"
                  label="Nesto vise:"
                  defaultValue={body}
                  fullWidth
                  onChange={handleChange}
                />
              </Form.Group>
              <br />

              <Form.Group>
                <TextField
                  required
                  name="cena"
                  id="standard-required"
                  label="Cena:"
                  defaultValue={cena}
                  onChange={handleChange}
                  fullWidth
                />
              </Form.Group>
              <br />
              <br />

              <CardMedia
                style={style.media}
                image={imgUrl}
                title="Fotografija oglasa"
              />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={handleImageChange}
              />
              <MyButton
                tip="Postavi sliku za oglas"
                onClick={handleEditPicture}
                btnClassName="button"
              >
                <EditIcon color="primary" />
              </MyButton>
              <br />
              <Button
                type="submit"
                color="primary"
                style={style.button}
                disabled={loading}
              >
                IZMENI
              </Button>
              {loading && <CircularProgress size={30} style={style.progress} />}
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Cardi2.propTypes = {
  updateImage: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  updateOglase: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { updateImage, updateOglase })(Cardi2);
