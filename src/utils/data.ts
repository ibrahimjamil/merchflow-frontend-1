const links = [
    {
      link: '/',
      label: "Home"
    },
    {
      link: '/about',
      label: "About"
    },
    {
      link: '/invite',
      label: "Invite"
    },
    {
      link: '/contact',
      label: "Contact"
    },
    {
      link: '/login',
      label: 'Login'
    },
    {
      link: '/logout',
      label: "Logout"
    }
  ]

const sizes = {
  label: "Size",
  placeholder: "Select size",
  data:[
    'Small','Medium','Large',
    'Extra Extra Small','Extra Small',
    '6XS', '5XS', '4XS', '3XS', 'Extra Large',
    '2XL', '3XL', '4XL', '5XL', '6XL', '7XL'
  ]
}

const style = {
  label: "Style",
  placeholder: "Select style",
  data:[
    'good','best','exceptional'
  ]
}

const category = {
  label: "Category",
  placeholder: "Select Category",
  data:[]
}

const brand = {
  label: "Brand",
  placeholder: "Select brand",
  data: []
}

const fabric = {
  label: "Fabric",
  placeholder: "Select fabric",
  data: []
}

const gender = {
  label: "Gender",
  placeholder: "Select gender",
  data: ['Men', 'Women', 'Unisex']
}

const material = {
  label: 'Material',
  placeholder: 'Select material',
  data: [
    '100% Cotton', '100% polyester', '50/50',
    'Blend', 'Fleece', 'Denier Polyester',
    'Pique', 'Cotton Poly','Twill',
    'Nylon', 'Ripstop Poly', 'Oxford',
    'Poplin', 'Denim', 'Poly/Nylon',
    'Jersey', 'Interlock', 'Acrylic'
  ]
}

const age = {
  label: "Age",
  placeholder: "Select age",
  data: ['Adult', 'Youth', 'Toddler', 'Infant']
}

const tableData={
  tableHead:[
    'Image', 'Style', 'Description','Color','Size', 'Stock'
  ],
  tableBodyData:[
    {
      style: 'AL2300',
      description: 'All made Unisex recycled Bend Tee',
      color: 'Navy',
      XS: 112,
      S: 112,
      M: 112,
      L: 112,
      XL: 112,
      '2XL': 112,
      '3XL': 112,
      '4XL': 112,
      '5XL': 112,
    },
    {
      style:'AL2300',
      description: 'All made Unisex recycled Bend Tee',
      color: 'Navy',
      XS: 112,
      S: 112,
      M: 112,
      L: 112,
      XL: 112,
      '2XL': 112,
      '3XL': 112,
      '4XL': 112,
      '5XL': 112
    },
    {
      Style:'AL2300',
      Description: 'All made Unisex recycled Bend Tee',
      Color: 'Navy',
      XS: 112,
      S: 112,
      M: 112,
      L: 112,
      XL: 112,
      '2XL': 112,
      '3XL': 112,
      '4XL': 112,
      '5XL': 112
    }
  ]
}

const colors = {
  label: "Color",
  placeholder: 'Select Color',
  data: [
    'Black','Cardinal', 'Charcoal',
    'White', 'Columbia Blue', 'Dark Green',
    'Dark Maroon'
  ]
}

  export {
      links,
      sizes,
      style,
      brand,
      fabric,
      gender,
      age,
      tableData,
      colors,
      category,
      material
  }