import React from 'react'

function SubscriptionRow({rowTitle,free,premiumAlpha,premiumBeta}) {
  return (
    <tr>
    <th scope="row" className="text-left">
      <h3 className="py-3">{rowTitle}</h3>
    </th>
    <td>
      <span className="block text-sm">{free}</span>
    </td>
    <td>
      <span className="block text-sm">{premiumAlpha}</span>
    </td>
    <td>
      <span className="block text-sm">{premiumBeta}</span>
    </td>
  </tr>
  )
}

export default SubscriptionRow