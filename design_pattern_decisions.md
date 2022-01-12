# Design patterns

### Inheritance and Interfaces<br />
    The Auction contract inherits from OpenZeppelin Ownable contract, it's a more stable solution.

### Access Control Design Patterns<br />
    Ownable design pattern was used to restrict user's that can add items to the catalogue, we'll be looking to
    improve that by creating roles so verified seller's can also add items