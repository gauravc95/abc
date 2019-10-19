FROM ubuntu:16.04

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 68DB5E88
RUN apt-get update
RUN apt-get install -y software-properties-common
RUN apt-get install -y apt-transport-https
RUN apt-get install -y curl
RUN add-apt-repository "deb https://repo.sovrin.org/sdk/deb xenial stable"
RUN apt-get update
RUN apt-get install -y libindy=1.8.2 libsovtoken=0.9.7 libvcx=0.2.3
RUN curl -L -o /tmp/libvcx_0.2.41140129-e0d1c6e_amd64.deb https://static.pps.evernym.com/diffusion2019/libvcx_0.2.41140129-e0d1c6e_amd64.deb
RUN dpkg -i /tmp/libvcx_0.2.41140129-e0d1c6e_amd64.deb
RUN rm /tmp/libvcx_0.2.41140129-e0d1c6e_amd64.deb
RUN apt-get install -y jq
RUN mkdir /indy
# Details see https://static.pps.evernym.com/diffusion2019/install-and-provision-libvcx-1.8.2.pdf
RUN python3 /usr/share/libvcx/provision_agent_keys.py "https://eas01.pps.evernym.com" 12345 --enterprise-seed EJ7ohtaiti3aixeitaefo4aeyah7Ieso | jq '.genesis_path="/indy/genesis.txn"|.institution_logo_url="http://example.org/hrtrust.png"|.institution_name="HRTrust"|.payment_method="sov"' > /indy/vcx-config.json

# https://static.pps.evernym.com/diffusion2019/python3-vcx-wrapper_0.2.41140129.tar.gz
# https://static.pps.evernym.com/diffusion2019/node-vcx-wrapper_0.2.41140129-e0d1c6e_amd64.tgz

WORKDIR /app

ENTRYPOINT ["/bin/bash"]
