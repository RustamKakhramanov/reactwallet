import React, { Component } from 'react';
import {ChromePicker, CirclePicker} from 'react-color';
import axios from 'axios';

class StoreCard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      type: 'storeCard',
      headerTitle: 'Nature | Republic',
      headerLogo: 'uploads/pattern/nature/icon.png',
      stripImage: 'uploads/pattern/nature/strip.png',
      headerField: '',
      typeImg: '',
      colorType: true,
      background: {
        r: '255',
        g: '255',
        b: '255',
        a: '1'
      },
      color: {
        r: '0',
        g: '0',
        b: '0',
        a: '1'
      },
      detailPicker: false,
      header: {
        field: {
          key: 'discount',
          changeMessage: 'Ваша бонусная программа изменилась до',
          value: '5%',
          label: 'Скидка'
        }
      },
      secondary: {
        0: {
          key: 'name',
          changeMessage: 'Ваше имя изменилось',
          value: 'Василий петров',
          label: 'Имя'
        },
        1: {
          key: 'balance',
          changeMessage: 'Ваш баланс изменен ',
          value: '500',
          label: 'Баланс'
        }
      },
      barcode: {
        format: 'PKBarcodeFormatCode128',
        value: '689212-637-951'
      }
    };
  }
  saveCard (e) {
    e.preventDefault();
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    let form = document.querySelector('form'),
      formData = new FormData();
    formData.append('headerLogo', headerLogo.files[0]);
    formData.append('stripImage', stripImage.files[0]);
    formData.append('post', JSON.stringify(this.state));

    axios
      .post('api/card/create', formData, config)
      .then(res => {
        window.open('card/download/' + res.data, '_blank');
      })
      .catch(error => {
        // this.setState({
        //   errors: error.response.data.errors
        // });
      });
  }

  handleInputChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  layoutFieldChange (e) {
    let name = e.target.name.split('-');
    let newState = Object.assign({}, this.state);
    if (name === 'barcode') {
      newState[name].format = e.target.value;
      this.setState(newState);
      return;
    }
    let label;
    let value = e.target.value;
    if (name[2] === 'key') {
      switch (value) {
        case 'static':
          label = '';
          break;
        case 'name':
          label = 'Имя';
          break;
        case 'discount':
          label = 'Скидка';
          break;
        case 'balance':
          label = 'Баланс';
          break;
        default:
          label = this.state[name[0]][name[1]].label;
      }
      newState[name[0]][name[1]].label = label;
    }

    newState[name[0]][name[1]][name[2]] = e.target.value;
    this.setState(newState);
  }

  changeImg (e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    let type = this.state.typeImg;
    reader.onloadend = () => {
      this.setState({
        [type]: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  clickInput (e, type) {
    console.log(type);
    this.setState({
      typeImg: type
    });
    console.log(this.state.background);
    document.getElementById(type).click();
  }

  setColor (color) {
    let type = this.state.colorType ? 'background' : 'color';
    this.setState({
      [type]: color.rgb
    });
  }

  render () {
    const styles = {
      card: {
        background: `rgba(${this.state.background.r}, ${this.state.background.g}, ${this.state.background.b}, ${this.state.background.a})`,
        color: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`
      }
    };
    let text = !this.state.colorType ? 'active' : '';
    let background = this.state.colorType ? 'active' : '';

    return (
      <div >
        <form type="POST" action="/card/create" className='mt-8 'onSubmit={e => this.saveCard(e)}>
          <div className="row">
            <div className="col-md-5">
              <input type="file" id="headerLogo" name="headerLogo" accept="image/png" onChange={e => this.changeImg(e)}
                className='hidden'/>
              <input type="file" id="stripImage" name='stripImage' accept="image/png" onChange={e => this.changeImg(e)}
                className='hidden'/>
              <div className='store-card border rounded card' style={ styles.card }>
                <div className="row p-2">
                  <div className="col-3 card-logo check" onClick={e => this.clickInput(e, 'headerLogo')}><img
                    className='header-img' src={this.state.headerLogo} alt=""/></div>
                  <input className="col-5 check" value={this.state.headerTitle} name='headerTitle'
                    onChange={e => this.handleInputChange(e)} placeholder='Введите текст' style={ styles.card }/>
                  <div className="col-3 t-item text-center" >
                    <span>{this.state.header.field.label}</span>
                    <span>{this.state.header.field.value}</span>
                  </div>
                </div>
                <div className="strip-image mt-1">
                  <div className="card-strip check" onClick={e => this.clickInput(e, 'stripImage')}>
                    <img className='strip-img' src={this.state.stripImage} alt=""/>
                  </div>
                </div>
                <div className="mt-1 secondary-card flex p-2" style={ styles.card }>
                  <div className="col-8 t-item">
                    <span>{this.state.secondary[0].label}</span>
                    <span>{this.state.secondary[0].value}</span>
                  </div>
                  <div className="col-4 t-item text-center">
                    <span>{this.state.secondary[1].label}</span>
                    <span>{this.state.secondary[1].value}</span>
                  </div>
                </div>
                <div className="barcode">
                  <img src="uploads/pattern/assets/barcode.jpg" alt=""/>
                </div>
              </div>
            </div>
            <div className="col-md-5 ml-auto">
              <nav className="nav nav-pills nav-fill mb-4">
                <div className={'nav-item nav-link ' + background} onClick={e => this.setState({colorType: !this.state.colorType})}>Цвет карты</div>
                <div className={'nav-item nav-link ' + text} onClick={e => this.setState({colorType: !this.state.colorType})}>Цвет текста</div>
              </nav>
              { this.state.detailPicker
                ? <div>
                  <ChromePicker
                    color={this.state.colorType ? this.state.background : this.state.color}
                    onChangeComplete={color => this.setColor(color)} />
                  <div className="btn btn-primary mt-2" onClick={ e => this.setState({ detailPicker: !this.state.detailPicker })}>Свернуть</div>
                </div>
                : <div>
                  <CirclePicker
                    color={ this.state.colorType ? this.state.background : this.state.color}
                    colors={ ['#fff', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#65bc50', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b']}
                    onChangeComplete={color => this.setColor(color)}
                  />
                  <div className="btn btn-primary mt-4" onClick={ e => this.setState({ detailPicker: !this.state.detailPicker })}>Детальнее</div>
                </div>
              }
              <div className="fields mt-3">
                <h4 className="text-center" >Измените поля</h4>
                <div className="flex flex-column mt-2">
                  <div className="item">
                    <span> 2) </span>
                    <select
                      onChange={e => this.layoutFieldChange(e)}
                      name='header-field-key' value={this.state.header.field.key}>
                      <option value="name">Имя</option>
                      <option value="balance">Баланс</option>
                      <option value="discount">Скидка</option>
                      <option value="static">Статичное</option>
                      <option value="date">Дата</option>
                    </select>
                    <input type="text" placeholder="Введите текст" name='header-field-value' value={this.state.header.field.value} onChange={e => this.layoutFieldChange(e)}/>
                    <input type="text" name='header-field-changeMessage' value={this.state.header.field.changeMessage} onChange={e => this.layoutFieldChange(e)}/>
                  </div>
                  <div className="item">
                    <span> 1) </span>
                    <select
                      onChange={e => this.layoutFieldChange(e)}
                      name='secondary-0-key'
                      value={this.state.secondary[0].key}
                    >
                      <option value="name">Имя</option>
                      <option value="balance">Баланс</option>
                      <option value="discount">Скидка</option>
                      <option value="static">Статичное</option>
                    </select>
                    <input type="text" placeholder="Введите текст" name='secondary-0-value' value={this.state.secondary[0].value} onChange={e => this.layoutFieldChange(e)}/>
                    <input type="text" value={this.state.secondary[0].changeMessage} onChange={e => this.layoutFieldChange(e)} name='secondary-0-changeMessage' />
                  </div>
                  <div className="item">
                    <span> 2) </span>
                    <select
                      onChange={e => this.layoutFieldChange(e)}
                      name='secondary-1-key'
                      value={this.state.secondary[1].key}
                    >
                      <option value="name">Имя</option>
                      <option value="balance">Баланс</option>
                      <option value="discount">Скидка</option>
                      <option value="static">Статичное</option>
                    </select>
                    <input type="text" placeholder="Введите текст" name='secondary-1-value' value={this.state.secondary[1].value} onChange={e => this.layoutFieldChange(e)}/>
                    <input type="text" name='secondary-1-changeMessage' value={this.state.secondary[1].changeMessage} placeholder={this.state.secondary[1].changeMessage} onChange={e => this.layoutFieldChange(e)}/>
                  </div>

                </div>
                <h5 className="text-center mt-4" >Формат бар-кода</h5>
                <div className="flex mt-2 barcode">
                  <select
                    onChange={e => this.layoutFieldChange(e)}
                    name='barcode' value={this.state.barcode.format}>
                    <option value="PKBarcodeFormatCode128">PKBarcodeFormatCode128</option>,
                    <option value="PKBarcodeFormatQR">PKBarcodeFormatQR</option>
                    <option value="PKBarcodeFormatPDF417">PKBarcodeFormatPDF417</option>
                    <option value="PKBarcodeFormatAztec">PKBarcodeFormatAztec</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <button type='submit' className='mt-4 btn btn-success'>Сохранить</button>
          </div>
        </form>
      </div>
    );
  }
}
export default StoreCard;
