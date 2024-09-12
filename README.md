# Sweep Access (v1.0)

## A second-level heading

### Docker commands to create an image

```
# Creates the image
docker build -t sweep-access-image .

# Run image
docker run -p 3000:3000 --name sweep-access-back sweep-access-image

# Test the applicaiton
Go to **http://localhost:3000** in the browser

# Get container ID (optional)
docker ps

# To view container's logs (optional)
docker logs container-id
```
