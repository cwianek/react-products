import React, { Component, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Cloth from './Cloth';

export default class OutfitPreview extends Component {

  getByCategory(category) {
    const prop = Object.keys(this.props.outfit).filter((prop) => prop.startsWith(category))[0];
    const val = this.props.outfit[prop] ? this.props.outfit[prop].localUri : null;
    return { val, category }
  }

  render() {
    const shoe = this.getByCategory('shoe');
    const socks = this.getByCategory('socks');
    const trouser = this.getByCategory('trouser');
    const tshirt = this.getByCategory('tshirt');
    const hoodie = this.getByCategory('hoodie');
    const jacket = this.getByCategory('jacket');

    return (
      <View style={styles.container}>
        <View style={[styles.tops, jacket.val == null ? (hoodie.val == null ? styles.noJacketNoHoodie : styles.noJacket) : null]}>
          {jacket.val && <Cloth style={[styles.jacket, hoodie.val == null ? styles.noHoodieJacket : null]} category={jacket.category} source={jacket.val}></Cloth>}
          {hoodie.val && <Cloth style={styles.hoodie} category={hoodie.category} source={hoodie.val}></Cloth>}
          {tshirt.val && <Cloth style={[styles.thsirt, jacket.val == null ? styles.noJacketShirt : null, hoodie.val == null ? styles.noHoodieShirt : null]} category={tshirt.category} source={tshirt.val}></Cloth>}
        </View>

        {trouser && <Cloth style={styles.trouser} category={trouser.category} source={trouser.val}></Cloth>}

        <View style={styles.bottom}>
          {shoe && <Cloth style={styles.shoe} category={shoe.category} source={shoe.val}></Cloth>}
          {socks && <Cloth style={styles.socks} category={socks.category} source={socks.val}></Cloth>}
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  image: {
    width: 95,
    height: 60,
  },
  imageContainer: {
    margin: 5
  },
  tops: {
    flexDirection: 'row'
  },
  jacket: {
  },
  bottom: {
    paddingTop: 20,
    paddingLeft: 30,
    flexDirection: 'row'
  },
  shoe: {
    alignItems: 'flex-end',
    bottom: 85,
    left: 85
  },
  socks: {
    bottom: 155,
    right: 30,
  },
  trouser: {
    paddingTop: 20,
    left: 30,
  },
  hoodie: {
    right: 10,
    top: 20,
  },
  thsirt: {
    right: 20,
    top: 40,
  },
  noJacket: {
    left: 35,
    top: -5
  },
  noJacketShirt: {
    left: 10,
  },
  noJacketNoHoodie:{
    left: -5,
    top: -20,
  },
  noHoodieJacket: {
    top: 15,
    left: 15
  },
  noHoodieShirt: {
    left: 30
  }
})
  ;