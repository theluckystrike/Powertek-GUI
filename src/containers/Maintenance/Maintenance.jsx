import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Divider from "../../components/common/styled/Divider";
import { useSpring, animated } from "@react-spring/web";
import SvgIcon from "@mui/material/SvgIcon";

import Collapse from "@mui/material/Collapse";
import { alpha, styled } from "@mui/material/styles";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";

import NamedContainer, { CollapsiableNamedContainer } from "../../components/common/NamedContainer";

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const CustomTreeItem = React.forwardRef((props, ref) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} ref={ref} />
));

const StyledTreeItem = styled(CustomTreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

function Tree() {
  const renderTree = (nodes) => (
    <StyledTreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={
        <Box sx={{ display: "flex", alignItems: "start", placeContent: "center", margin: "auto" }}>
          <Typography variant="h6" sx={{ minWidth: 200, fontWeight: 600 }}>
            {nodes.name}
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ display: "flex", alignItems: "start", placeContent: "center", margin: "auto" }}>
            ({nodes.included} included, {nodes.excluded} excluded) ({nodes.status})
          </Box>
        </Box>
      }
    >
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </StyledTreeItem>
  );
  const treeData = [
    {
      id: "1",
      name: "All Settings",
      included: 62,
      excluded: 27,
      status: "Included",
      children: [
        {
          id: "1-1",
          name: "Bulk Configuration Settings",
          status: "Inherited",
          children: [], // Add children if any
        },
        {
          id: "1-2",
          name: "Card Reader Settings (1 included, 1 excluded)",
          status: "Inherited",
          children: [], // Add children if any
        },
        // ... more nodes
      ],
    },
    // ... more root-level nodes
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TreeView
        aria-label="customized"
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
        defaultEndIcon={<CloseSquare />}
        sx={{ overflowX: "hidden" }}
      >
        {treeData.map((data) => renderTree(data))}
      </TreeView>
    </Box>
  );
}

export default function Maintenance() {
  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="Bulk Configuration Profile">
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <Grid container rowSpacing={2}>
                  <Grid item xs={5} sx={{ display: "flex" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, margin: "auto" }}>
                      Name
                    </Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ display: "flex", placeContent: "center" }}>
                    <Divider
                      orientation="vertical"
                      variant="middle"
                      flexItem
                      sx={{ display: "flex", placeContent: "center" }}
                    />
                  </Grid>
                  <Grid item xs={5} sx={{ display: "flex" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, margin: "auto" }}>
                      XXXXXXXX
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container rowSpacing={2}>
                  <Grid item xs={5} sx={{ display: "flex" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, margin: "auto" }}>
                      Description
                    </Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ display: "flex", placeContent: "center" }}>
                    <Divider
                      orientation="vertical"
                      variant="middle"
                      flexItem
                      sx={{ display: "flex", placeContent: "center" }}
                    />
                  </Grid>
                  <Grid item xs={5} sx={{ display: "flex" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, margin: "auto" }}>
                      XXXXXXXX
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container rowSpacing={2}>
                  <Grid item xs={5} sx={{ display: "flex" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, margin: "auto" }}>
                      Set as Default
                    </Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ display: "flex", placeContent: "center" }}>
                    <Divider
                      orientation="vertical"
                      variant="middle"
                      flexItem
                      sx={{ display: "flex", placeContent: "center" }}
                    />
                  </Grid>
                  <Grid item xs={5} sx={{ display: "flex", placeContent: "center" }}>
                    <Checkbox />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </NamedContainer>
        </Grid>
        <Grid item xs={12}>
          <NamedContainer title="Settings">
            <Tree />
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
