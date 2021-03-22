import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown'
import { useCombobox, resetIdCounter } from 'downshift'
import SEARCH_PRODUCTS from '../graphql/queries/searchProducts'
import { useLazyQuery } from '@apollo/client'
import debounce from 'lodash.debounce'
import { useRouter } from 'next/router'
const Search = () => {
  const [findItems, { data, loading }] = useLazyQuery(SEARCH_PRODUCTS, {
    fetchPolicy: 'no-cache'
  })
  const router = useRouter()
  resetIdCounter()
  const findItemsButChill = debounce(findItems, 350)
  const items = data?.searchTerms || []
  const { getMenuProps, isOpen, getInputProps, getComboboxProps, inputValue, getItemProps, highlightedIndex } = useCombobox({
    items,
    onInputValueChange() {
      findItemsButChill({
        variables: {
          searchTerm: inputValue
        }
      })
    },
    onSelectedItemChange({ selectedItem }) {
      router.push(`/product/${selectedItem.id}`)
    },
    itemToString: item => item?.name || ''
  })
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input {...getInputProps({ type: 'search', id: 'search', placeholder: "search for item", className: loading ? "loading" : '' })} />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen && items.map((item, index) => (
          <DropDownItem highlighted={index === highlightedIndex} key={item.id} {...getItemProps({ item })}>
            <img width="50" src={item.photo.image.publicUrlTransformed} alt={item.name} />
            {item.name}
          </DropDownItem>
        ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry no items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  )
}

export default Search
